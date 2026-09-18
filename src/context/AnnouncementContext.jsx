import { createContext, useEffect, useReducer } from "react";
import seedAnnouncements from "../data/announcements";

const AnnouncementContext = createContext();

function loadAnnouncements() {
  const stored = JSON.parse(
    localStorage.getItem("announcements")
  );

  return stored || seedAnnouncements;
}

const initialState = {
  announcements: loadAnnouncements(),
};

function announcementReducer(state, action) {
  switch (action.type) {
    case "ADD_ANNOUNCEMENT":
      return {
        ...state,
        announcements: [action.payload, ...state.announcements],
      };

    case "DELETE_ANNOUNCEMENT":
      return {
        ...state,
        announcements: state.announcements.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

function AnnouncementProvider({ children }) {
  const [state, dispatch] = useReducer(
    announcementReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem(
      "announcements",
      JSON.stringify(state.announcements)
    );
  }, [state.announcements]);

  return (
    <AnnouncementContext.Provider value={{ state, dispatch }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export { AnnouncementContext, AnnouncementProvider };
