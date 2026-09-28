import { Link, NavLink, useNavigate } from "react-router-dom";
import { getSociety } from "../utils/society";
import "../Pages/Navbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // Society name comes from the logged-in user's society
  const societyName =
    getSociety(user?.societyId)?.name || user?.societyName;

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ss-navbar ss-admin-navbar">
      <div className="container-fluid">

        {/* Brand */}
        <Link
          className="navbar-brand ss-brand"
          to={
            user?.role === "superadmin"
              ? "/super-admin/dashboard"
              : "/admin/dashboard"
          }
        >
          SocietySync{" "}
          <span className="ss-admin-tag">
            {user?.role === "superadmin"
              ? "Super Admin"
              : `${societyName} | Admin`}
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible nav links - only for Admin */}
        <div
          className="collapse navbar-collapse"
          id="adminNavbarContent"
        >
          {user?.role === "admin" && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/manage-members"
                >
                  Manage Members
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/manage-complaints"
                >
                  Manage Complaints
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/manage-announcements"
                >
                  Announcements
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/manage-bookings"
                >
                  Facility Bookings
                </Link>
              </li>

            </ul>
          )}

          {user?.role === "superadmin" && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/super-admin/manage-societies"
                >
                  Manage Societies
                </Link>
              </li>

            </ul>
          )}
        </div>

        {/* Logout is kept OUTSIDE the collapsible menu so it always
            stays visible and reachable, even on smaller screens. */}
        <div className="d-flex align-items-center gap-3 ss-admin-right">

          {user ? (
            <>
              <button
                className="btn btn-danger ss-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn btn-outline-light"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn btn-warning"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;
