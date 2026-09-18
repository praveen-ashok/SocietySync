import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ComplaintContext } from "../context/ComplaintContext";
import { AnnouncementContext } from "../context/AnnouncementContext";
import { BookingContext } from "../context/BookingContext";
import seedUsers from "../data/users";
import "./AdminDashboard.css";

function getAllMembers() {
  const registered =
    JSON.parse(localStorage.getItem("users")) || [];

  return [...seedUsers, ...registered].filter(
    (u) => u.role === "member"
  );
}

function AdminDashboard() {
  const navigate = useNavigate();

  const { state: complaintState } = useContext(ComplaintContext);
  const { state: announcementState } = useContext(AnnouncementContext);
  const { state: bookingState } = useContext(BookingContext);

  const members = getAllMembers();
  const complaints = complaintState.complaints;
  const bookings = bookingState.bookings;

  const pendingComplaints = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const activeBookings = bookings.filter(
    (b) => b.status !== "Cancelled"
  ).length;

  const payments =
    JSON.parse(localStorage.getItem("payments")) || [];

  const totalCollected = payments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  const recentComplaints = complaints.slice(0, 5);
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, Admin!</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Members</h3>
          <h2>{members.length}</h2>
          <p>Registered on SocietySync</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Complaints</h3>
          <h2>{complaints.length}</h2>
          <p>Raised by members</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Complaints</h3>
          <h2>{pendingComplaints}</h2>
          <p>Need attention</p>
        </div>

        <div className="dashboard-card">
          <h3>Resolved Complaints</h3>
          <h2>{resolvedComplaints}</h2>
          <p>Closed successfully</p>
        </div>

        <div className="dashboard-card">
          <h3>Active Bookings</h3>
          <h2>{activeBookings}</h2>
          <p>{bookings.length} total requests</p>
        </div>

        <div className="dashboard-card">
          <h3>Maintenance Collected</h3>
          <h2>₹{totalCollected}</h2>
          <p>{payments.length} payments received</p>
        </div>

        <div className="dashboard-card">
          <h3>Announcements</h3>
          <h2>{announcementState.announcements.length}</h2>
          <p>Published notices</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <button onClick={() => navigate("/admin/manage-members")}>
          Manage Members
        </button>

        <button onClick={() => navigate("/admin/manage-complaints")}>
          Manage Complaints
        </button>

        <button onClick={() => navigate("/admin/manage-bookings")}>
          Manage Bookings
        </button>

        <button onClick={() => navigate("/admin/manage-announcements")}>
          Manage Announcements
        </button>

      </div>

      {/* Recent Activity */}
      <div className="admin-activity-grid">

        {/* Recent Complaints */}
        <div className="admin-activity-card">

          <div className="admin-activity-card-head">
            <h2>Recent Complaints</h2>
            <button
              className="admin-view-all-btn"
              onClick={() => navigate("/admin/manage-complaints")}
            >
              View All
            </button>
          </div>

          {recentComplaints.length === 0 ? (
            <p className="admin-empty-text">
              No complaints have been raised yet.
            </p>
          ) : (
            <table>

              <thead>
                <tr>
                  <th>Member</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentComplaints.map((c) => (
                  <tr key={c.id}>
                    <td>{c.raisedBy}</td>
                    <td>{c.title}</td>
                    <td>{c.category}</td>
                    <td>
                      <span
                        className={c.status
                          .toLowerCase()
                          .replace(" ", "-")}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>

        {/* Recent Facility Bookings */}
        <div className="admin-activity-card">

          <div className="admin-activity-card-head">
            <h2>Recent Facility Bookings</h2>
            <button
              className="admin-view-all-btn"
              onClick={() => navigate("/admin/manage-bookings")}
            >
              View All
            </button>
          </div>

          {recentBookings.length === 0 ? (
            <p className="admin-empty-text">
              No facility bookings have been made yet.
            </p>
          ) : (
            <table>

              <thead>
                <tr>
                  <th>Member</th>
                  <th>Facility</th>
                  <th>Date &amp; Slot</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.bookedByName || b.bookedBy}</td>
                    <td>{b.facility}</td>
                    <td>{b.date} · {b.time}</td>
                    <td>
                      <span
                        className={`admin-booking-status ${(b.status || "Confirmed").toLowerCase()}`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
