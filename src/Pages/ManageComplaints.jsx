import { useContext, useState } from "react";
import { ComplaintContext } from "../context/ComplaintContext";
import { filterBySociety, getLoggedInUser } from "../utils/society";
import Modal from "../ComponentCommon/Modal";
import "./ManageComplaints.css";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved"];

function ManageComplaints() {
  const { state, dispatch } = useContext(ComplaintContext);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const admin = getLoggedInUser();
  const complaints = filterBySociety(
    state.complaints,
    admin?.societyId
  );

  const handleStatusChange = (id, newStatus) => {
    dispatch({
      type: "UPDATE_STATUS",
      payload: { id, status: newStatus },
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this complaint permanently?"
    );

    if (!confirmDelete) return;

    dispatch({
      type: "DELETE_COMPLAINT",
      payload: id,
    });
  };

  return (
    <div className="manage-complaints-container">

      <div className="manage-complaints-header">
        <h1>Manage Complaints</h1>
      </div>

      <div className="table-container">
        <table className="complaints-table">

          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Raised By</th>
              <th>Flat</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-row">
                  No complaints have been raised yet.
                </td>
              </tr>
            ) : (
              complaints.map((c) => (
                <tr key={c.id}>

                  <td className="complaint-title-cell">{c.title}</td>

                  <td>{c.category}</td>

                  <td>{c.raisedBy}</td>

                  <td>{c.flatNumber || "—"}</td>

                  <td>
                    <span
                      className={`complaint-status-badge ${c.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {c.status}
                    </span>

                    <select
                      className="status-select"
                      value={c.status}
                      onChange={(e) =>
                        handleStatusChange(c.id, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedComplaint(c)}
                    >
                      View
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c.id)}
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

      {selectedComplaint && (
        <Modal
          title="Complaint Details"
          onClose={() => setSelectedComplaint(null)}
        >
          <div className="ss-detail-row">
            <span className="ss-detail-label">Title</span>
            <p className="ss-detail-value">
              {selectedComplaint.title}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Category</span>
            <p className="ss-detail-value">
              {selectedComplaint.category}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Description</span>
            <p className="ss-detail-value">
              {selectedComplaint.description}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Raised By</span>
            <p className="ss-detail-value">
              {selectedComplaint.raisedBy}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Flat</span>
            <p className="ss-detail-value">
              {selectedComplaint.flatNumber || "—"}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Date Raised</span>
            <p className="ss-detail-value">
              {new Date(
                selectedComplaint.createdAt
              ).toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="ss-detail-row">
            <span className="ss-detail-label">Status</span>
            <p className="ss-detail-value">
              {selectedComplaint.status}
            </p>
          </div>
        </Modal>
      )}

    </div>
  );
}

export default ManageComplaints;
