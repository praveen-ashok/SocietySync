import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
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

function SuperAdminDashboard() {
  const { dispatch: complaintDispatch } = useContext(ComplaintContext);
  const { dispatch: announcementDispatch } =
    useContext(AnnouncementContext);
  const { dispatch: bookingDispatch } = useContext(BookingContext);

  const [societies, setSocieties] = useState(getSocieties());
  const [showForm, setShowForm] = useState(false);
  const [managingId, setManagingId] = useState(null);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const code = data.code.trim().toUpperCase();
    const adminEmail = data.adminEmail.trim();

    if (societies.some((s) => s.code === code)) {
      setFormError("A society with this code already exists.");
      return;
    }

    if (getAllUsers().some((u) => u.email === adminEmail)) {
      setFormError("This admin email is already registered.");
      return;
    }

    setFormError("");

    const newSociety = {
      id: code,
      code,
      name: data.name.trim(),
      address: data.address.trim(),
      adminName: data.adminName.trim(),
      adminEmail,
      createdAt: new Date().toISOString(),
    };

    // Society Admin account linked to this society
    const newAdmin = {
      id: Date.now(),
      name: newSociety.adminName,
      email: adminEmail,
      password: data.adminPassword,
      role: "admin",
      societyId: newSociety.id,
      societyName: newSociety.name,
    };

    const registered =
      JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem(
      "users",
      JSON.stringify([...registered, newAdmin])
    );

    const updated = [...societies, newSociety];
    saveSocieties(updated);
    setSocieties(updated);

    reset();
    setShowForm(false);
  };

  const handleRemove = (society) => {
    const confirmRemove = window.confirm(
      `Remove ${society.name}? Its admin, members and all its data will be deleted.`
    );

    if (!confirmRemove) return;

    // Society
    const updated = societies.filter((s) => s.id !== society.id);
    saveSocieties(updated);
    setSocieties(updated);

    // Its registered users
    const registered =
      JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem(
      "users",
      JSON.stringify(
        registered.filter((u) => u.societyId !== society.id)
      )
    );

    // Its payments
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

    // Its complaints, announcements and bookings
    complaintDispatch({ type: "PURGE_SOCIETY", payload: society.id });
    announcementDispatch({ type: "PURGE_SOCIETY", payload: society.id });
    bookingDispatch({ type: "PURGE_SOCIETY", payload: society.id });

    setManagingId(null);
  };

  const memberCount = (societyId) =>
    getAllUsers().filter(
      (u) => u.role === "member" && u.societyId === societyId
    ).length;

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Super Admin Dashboard</h1>
          <p>Manage the societies using SocietySync.</p>
        </div>
      </div>

      {/* Add Society */}
      <div className="quick-actions">

        <h2>Add Society</h2>

        {!showForm && (
          <button onClick={() => setShowForm(true)}>
            Add Society
          </button>
        )}

        {showForm && (
          <form
            className="society-form"
            onSubmit={handleSubmit(onSubmit)}
          >

            <div className="society-form-group">
              <label>Society Name</label>
              <input
                type="text"
                placeholder="e.g. Maple Heights Society"
                {...register("name", {
                  required: "Society name is required",
                })}
              />
              {errors.name && (
                <p className="society-error">{errors.name.message}</p>
              )}
            </div>

            <div className="society-form-group">
              <label>Society Code</label>
              <input
                type="text"
                placeholder="e.g. MH001"
                {...register("code", {
                  required: "Society code is required",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Code can contain only letters and numbers",
                  },
                })}
              />
              {errors.code && (
                <p className="society-error">{errors.code.message}</p>
              )}
            </div>

            <div className="society-form-group">
              <label>Society Address</label>
              <input
                type="text"
                placeholder="Enter society address"
                {...register("address", {
                  required: "Society address is required",
                })}
              />
              {errors.address && (
                <p className="society-error">{errors.address.message}</p>
              )}
            </div>

            <div className="society-form-group">
              <label>Admin Name</label>
              <input
                type="text"
                placeholder="Enter admin name"
                {...register("adminName", {
                  required: "Admin name is required",
                })}
              />
              {errors.adminName && (
                <p className="society-error">
                  {errors.adminName.message}
                </p>
              )}
            </div>

            <div className="society-form-group">
              <label>Admin Email</label>
              <input
                type="email"
                placeholder="Enter admin email"
                {...register("adminEmail", {
                  required: "Admin email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.adminEmail && (
                <p className="society-error">
                  {errors.adminEmail.message}
                </p>
              )}
            </div>

            <div className="society-form-group">
              <label>Admin Password</label>
              <input
                type="password"
                placeholder="Enter admin password"
                {...register("adminPassword", {
                  required: "Admin password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password must contain at least 8 characters",
                  },
                })}
              />
              {errors.adminPassword && (
                <p className="society-error">
                  {errors.adminPassword.message}
                </p>
              )}
            </div>

            {formError && <p className="society-error">{formError}</p>}

            <div className="society-form-actions">
              <button type="submit">Create Society</button>
              <button
                type="button"
                className="society-secondary-btn"
                onClick={() => {
                  setShowForm(false);
                  setFormError("");
                  reset();
                }}
              >
                Cancel
              </button>
            </div>

          </form>
        )}

      </div>

      {/* Society List */}
      <div className="admin-activity-card">

        <div className="admin-activity-card-head">
          <h2>Society List</h2>
        </div>

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
                    <p>Code: {s.code}</p>
                    <p>Admin: {s.adminName}</p>
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

export default SuperAdminDashboard;
