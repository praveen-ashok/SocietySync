import { useContext, useState } from "react";
import { ComplaintContext } from "../context/ComplaintContext";
import { AnnouncementContext } from "../context/AnnouncementContext";
import { BookingContext } from "../context/BookingContext";
import {
  getAllUsers,
  getSocieties,
  saveSocieties,
} from "../utils/society";
import "./AdminDashboard.css";
import "./SuperAdminDashboard.css";

function ManageSocieties() {
  const { dispatch: complaintDispatch } = useContext(ComplaintContext);
  const { dispatch: announcementDispatch } =
    useContext(AnnouncementContext);
  const { dispatch: bookingDispatch } = useContext(BookingContext);

  // Societies already stored by the multi-society functionality
  const [societies, setSocieties] = useState(getSocieties());
  const [managingId, setManagingId] = useState(null);

  const memberCount = (societyId) =>
    getAllUsers().filter(
      (u) => u.role === "member" && u.societyId === societyId
    ).length;

  const handleRemove = (society) => {
    const confirmRemove = window.confirm(
      `Remove ${society.name}? Its admin, members and all its data will be deleted.`
    );

    if (!confirmRemove) return;

    const updated = societies.filter((s) => s.id !== society.id);
    saveSocieties(updated);
    setSocieties(updated);

    const registered =
      JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem(
      "users",
      JSON.stringify(
        registered.filter((u) => u.societyId !== society.id)
      )
    );

    const payments =
      JSON.parse(localStorage.getItem("payments")) || [];
    localStorage.setItem(
      "payments",
      JSON.stringify(
        payments.filter(
          (p) => (p.societyId || "MH001") !== society.id
        )
      )
    );

    complaintDispatch({ type: "PURGE_SOCIETY", payload: society.id });
    announcementDispatch({ type: "PURGE_SOCIETY", payload: society.id });
    bookingDispatch({ type: "PURGE_SOCIETY", payload: society.id });

    setManagingId(null);
  };

  return (
    <div className="admin-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Manage Societies</h1>
          <p>Societies currently using SocietySync.</p>
        </div>
      </div>

      <div className="admin-activity-card">

        {societies.length === 0 ? (
          <p className="admin-empty-text">
            No societies added yet.
          </p>
        ) : (
          <div className="society-list">
            {societies.map((s) => (
              <div className="society-item" key={s.id}>

                <div className="society-item-top">
                  <div>
                    <h4>{s.name}</h4>
                    <p>Society Admin: {s.adminName}</p>
                  </div>

                  <button
                    className="admin-view-all-btn"
                    onClick={() =>
                      setManagingId(managingId === s.id ? null : s.id)
                    }
                  >
                    Manage
                  </button>
                </div>

                {managingId === s.id && (
                  <div className="society-manage-panel">
                    <p><strong>Code:</strong> {s.code}</p>
                    <p><strong>Address:</strong> {s.address}</p>
                    <p><strong>Admin Email:</strong> {s.adminEmail}</p>
                    <p><strong>Members:</strong> {memberCount(s.id)}</p>

                    <button
                      className="society-remove-btn"
                      onClick={() => handleRemove(s)}
                    >
                      Remove Society
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default ManageSocieties;
