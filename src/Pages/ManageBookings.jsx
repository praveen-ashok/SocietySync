import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import "./ManageBookings.css";

function ManageBookings() {
  const { state, dispatch } = useContext(BookingContext);

  const bookings = [...state.bookings].sort(
    (a, b) => b.id - a.id
  );

  const handleCancel = (id) => {
    const confirmCancel = window.confirm(
      "Cancel this booking? This will free up the time slot."
    );

    if (!confirmCancel) return;

    dispatch({ type: "CANCEL_BOOKING", payload: id });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Remove this booking record permanently?"
    );

    if (!confirmDelete) return;

    dispatch({ type: "DELETE_BOOKING", payload: id });
  };

  return (
    <div className="manage-bookings-container">

      <div className="manage-bookings-header">
        <h1>Manage Facility Bookings</h1>
        <p>Review every booking request raised by society members.</p>
      </div>

      <div className="table-container">
        <table className="bookings-table">

          <thead>
            <tr>
              <th>Member</th>
              <th>Flat</th>
              <th>Facility</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty-row">
                  No facility bookings have been made yet.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>

                  <td className="booking-member-cell">
                    {b.bookedByName || b.bookedBy}
                  </td>

                  <td>{b.flatNumber || "—"}</td>

                  <td>{b.facility}</td>

                  <td>{b.date}</td>

                  <td>{b.time}</td>

                  <td>
                    <span
                      className={`booking-status-badge ${(b.status || "Confirmed").toLowerCase()}`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="booking-actions-cell">
                    {b.status !== "Cancelled" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(b.id)}
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ManageBookings;
