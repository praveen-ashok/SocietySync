import { useContext } from "react";
import { AnnouncementContext } from "../context/AnnouncementContext";
import { filterBySociety, getLoggedInUser } from "../utils/society";
import "./Announcements.css";

function Announcements() {
  const { state } = useContext(AnnouncementContext);

  const user = getLoggedInUser();
  const announcements = filterBySociety(
    state.announcements,
    user?.societyId
  );

  return (
    <div className="announcements-container">

      <div className="announcements-header">
        <h1>Announcements</h1>
        <p>Stay up to date with the latest notices and events from the society committee.</p>
      </div>

      {announcements.length === 0 ? (
        <p className="announcements-empty-text">
          No announcements have been published yet.
        </p>
      ) : (
        <div className="announcements-grid">
          {announcements.map((a) => (
            <div className="announcement-card" key={a.id}>

              <span className="announcement-tag">
                {a.category}
              </span>

              <h4>{a.title}</h4>

              <p>{a.description}</p>

              <p className="announcement-date">
                {new Date(a.date).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Announcements;
