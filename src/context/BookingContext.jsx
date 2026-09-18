import { createContext, useEffect, useReducer } from "react";

const BookingContext = createContext();

function loadBookings() {
  const stored = JSON.parse(
    localStorage.getItem("bookings")
  );

  if (!stored) return [];

  // Older bookings (saved before "status" existed) default to Confirmed
  // so pages that read booking.status never crash on undefined.
  return stored.map((b) => ({ status: "Confirmed", ...b }));
}

const initialState = {
  bookings: loadBookings(),
};

function bookingReducer(state, action) {
  switch (action.type) {
    case "ADD_BOOKING":
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      };

    case "CANCEL_BOOKING":
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload
            ? { ...booking, status: "Cancelled" }
            : booking
        ),
      };

    case "DELETE_BOOKING":
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(
    bookingReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem(
      "bookings",
      JSON.stringify(state.bookings)
    );
  }, [state.bookings]);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export { BookingContext, BookingProvider };
