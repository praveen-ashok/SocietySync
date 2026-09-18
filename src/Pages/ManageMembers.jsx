import { useState } from "react";
import seedUsers from "../data/users";
import "./ManageMembers.css";

function loadMembers() {
  const registered =
    JSON.parse(localStorage.getItem("users")) || [];

  return [...seedUsers, ...registered].filter(
    (u) => u.role === "member"
  );
}

function ManageMembers() {
  const [members, setMembers] = useState(loadMembers());

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmDelete) return;

    // Only registered (non-seed) users are stored in "users"
    const registered =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedRegistered = registered.filter(
      (u) => u.id !== id
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedRegistered)
    );

    setMembers(
      [...seedUsers, ...updatedRegistered].filter(
        (u) => u.role === "member"
      )
    );
  };

  return (
    <div className="manage-members-container">

      <div className="manage-members-header">
        <h1>Manage Members</h1>
      </div>

      <div className="table-container">
        <table className="members-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Flat Number</th>
              <th>Block</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-row">
                  No members registered yet.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id}>

                  <td className="member-name">{m.name}</td>

                  <td>{m.email}</td>

                  <td>{m.phone || "—"}</td>

                  <td>{m.flatNumber || "—"}</td>

                  <td>{m.block || "—"}</td>

                  <td className="member-actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(m.id)}
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

export default ManageMembers;
