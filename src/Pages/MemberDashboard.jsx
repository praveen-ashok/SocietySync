import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ComplaintContext } from "../context/ComplaintContext";
import { AnnouncementContext } from "../context/AnnouncementContext";
import { BookingContext } from "../context/BookingContext";
import "./MemberDashboard.css";

function MemberDashboard() {
  const navigate = useNavigate();

  const { state: complaintState } = useContext(ComplaintContext);
  const { state: announcementState } = useContext(AnnouncementContext);
  const { state: bookingState } = useContext(BookingContext);

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const myComplaints = complaintState.complaints.filter(
    (c) => c.raisedBy === user?.email
  );

  const pendingComplaints = myComplaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolvedComplaints = myComplaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const myBookings = bookingState.bookings.filter(
    (b) => b.bookedBy === user?.email
  );

  const upcomingBookings = myBookings.filter(
    (b) => b.status !== "Cancelled"
  );

  const payments =
    JSON.parse(localStorage.getItem("payments")) || [];

  const myPayments = payments.filter(
    (p) => p.paidBy === user?.email
  );

  const recentNotices = announcementState.announcements.slice(0, 3);
  const recentComplaints = myComplaints.slice(0, 3);
  const recentBookings = myBookings.slice(0, 3);
  const recentPayments = myPayments.slice(0, 3);

  return (
    <div className="member-dashboard">

      {/* Header */}
      <div className="member-dashboard-header">
        <h1>Welcome back, {user?.name}</h1>
        <p>
          Flat {user?.flatNumber || "—"} · Block {user?.block || "—"}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="member-dashboard-cards">

        <div className="member-card">
          <h3>Total Complaints</h3>
          <h2>{myComplaints.length}</h2>
          <p>Raised so far</p>
        </div>

        <div className="member-card">
          <h3>Pending Complaints</h3>
          <h2>{pendingComplaints}</h2>
          <p>Awaiting action</p>
        </div>

        <div className="member-card">
          <h3>Resolved Complaints</h3>
          <h2>{resolvedComplaints}</h2>
          <p>Closed successfully</p>
        </div>

        <div className="member-card">
          <h3>Active Bookings</h3>
          <h2>{upcomingBookings.length}</h2>
          <p>Facilities reserved</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="member-quick-actions">

        <h2>Quick Actions</h2>

        <button onClick={() => navigate("/complaints")}>
          Raise a Complaint
        </button>

        <button onClick={() => navigate("/bookings")}>
          Book a Facility
        </button>

        <button onClick={() => navigate("/announcements")}>
          View Announcements
        </button>

        <button onClick={() => navigate("/payment")}>
          Pay Maintenance
        </button>

      </div>

      {/* Recent Activity */}
      <h2 className="member-activity-title">Recent Activity</h2>

      <div className="member-activity-grid">

        {/* Recent Notices */}
        <div className="activity-card">

          <div className="activity-card-head">
            <h3>Recent Notices</h3>
            <button
              className="activity-view-all"
              onClick={() => navigate("/announcements")}
            >
              View All
            </button>
          </div>

          {recentNotices.length === 0 ? (
            <p className="activity-empty-text">
              No notices published yet.
            </p>
          ) : (
            <ul className="activity-list">
              {recentNotices.map((n) => (
                <li className="activity-list-item" key={n.id}>
                  <div className="activity-item-top">
                    <span className="activity-item-title">
                      {n.title}
                    </span>
                    <span className="activity-tag notice-tag">
                      {n.category}
                    </span>
                  </div>
                  <span className="activity-item-meta">
                    {new Date(n.date).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </div>

        {/* Recent Complaints */}
        <div className="activity-card">

          <div className="activity-card-head">
            <h3>Recent Complaints</h3>
            <button
              className="activity-view-all"
              onClick={() => navigate("/complaints")}
            >
              View All
            </button>
          </div>

          {recentComplaints.length === 0 ? (
            <p className="activity-empty-text">
              You haven't raised any complaints yet.
            </p>
          ) : (
            <ul className="activity-list">
              {recentComplaints.map((c) => (
                <li className="activity-list-item" key={c.id}>
                  <div className="activity-item-top">
                    <span className="activity-item-title">
                      {c.title}
                    </span>
                    <span
                      className={`activity-status ${c.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <span className="activity-item-meta">
                    {c.category} ·{" "}
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </div>

        {/* Recent Facility Bookings */}
        <div className="activity-card">

          <div className="activity-card-head">
            <h3>Recent Facility Bookings</h3>
            <button
              className="activity-view-all"
              onClick={() => navigate("/bookings")}
            >
              View All
            </button>
          </div>

          {recentBookings.length === 0 ? (
            <p className="activity-empty-text">
              No bookings yet. Reserve a facility to see it here.
            </p>
          ) : (
            <ul className="activity-list">
              {recentBookings.map((b) => (
                <li className="activity-list-item" key={b.id}>
                  <div className="activity-item-top">
                    <span className="activity-item-title">
                      {b.facility}
                    </span>
                    <span
                      className={`activity-status ${(b.status || "Confirmed").toLowerCase()}`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <span className="activity-item-meta">
                    {b.date} · {b.time}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </div>

        {/* Recent Payments */}
        <div className="activity-card">

          <div className="activity-card-head">
            <h3>Recent Payments</h3>
            <button
              className="activity-view-all"
              onClick={() => navigate("/payment")}
            >
              View All
            </button>
          </div>

          {recentPayments.length === 0 ? (
            <p className="activity-empty-text">
              No maintenance payments made yet.
            </p>
          ) : (
            <ul className="activity-list">
              {recentPayments.map((p) => (
                <li className="activity-list-item" key={p.id}>
                  <div className="activity-item-top">
                    <span className="activity-item-title">
                      {p.month}
                    </span>
                    <span className="activity-tag payment-tag">
                      ₹{p.amount}
                    </span>
                  </div>
                  <span className="activity-item-meta">
                    {p.method} ·{" "}
                    {new Date(p.paidOn).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </div>

      </div>

    </div>
  );
}

export default MemberDashboard;
