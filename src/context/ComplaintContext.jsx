import { createContext, useEffect, useReducer } from "react";

const ComplaintContext = createContext();

function loadComplaints() {
  const stored = JSON.parse(
    localStorage.getItem("complaints")
  );

  return stored || [];
}

const initialState = {
  complaints: loadComplaints(),
};

function complaintReducer(state, action) {
  switch (action.type) {
    case "ADD_COMPLAINT":
      return {
        ...state,
        complaints: [action.payload, ...state.complaints],
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        complaints: state.complaints.map((complaint) =>
          complaint.id === action.payload.id
            ? { ...complaint, status: action.payload.status }
            : complaint
        ),
      };

    case "DELETE_COMPLAINT":
      return {
        ...state,
        complaints: state.complaints.filter(
          (complaint) => complaint.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

function ComplaintProvider({ children }) {
  const [state, dispatch] = useReducer(
    complaintReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem(
      "complaints",
      JSON.stringify(state.complaints)
    );
  }, [state.complaints]);

  return (
    <ComplaintContext.Provider value={{ state, dispatch }}>
      {children}
    </ComplaintContext.Provider>
  );
}

export { ComplaintContext, ComplaintProvider };
