import { useContext } from "react";
import { ComplaintContext } from "../context/ComplaintContext";
import "./ManageComplaints.css";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved"];

function ManageComplaints() {
  const { state, dispatch } = useContext(ComplaintContext);

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
            {state.complaints.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-row">
                  No complaints have been raised yet.
                </td>
              </tr>
            ) : (
              state.complaints.map((c) => (
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

    </div>
  );
}

export default ManageComplaints;
