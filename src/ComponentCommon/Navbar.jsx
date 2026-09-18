import { Link,NavLink, useNavigate } from "react-router-dom";
import "../Pages/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ss-navbar">
      <div className="container-fluid">

        {/* Brand */}
        <Link
          className="navbar-brand ss-brand"
          to="/"
        >
          SocietySync
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >

          {/* Show links only after login as member */}
          {user && user.role === "member" && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/member-dashboard"
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/complaints"
                >
                  Complaints
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/announcements"
                >
                  Announcements
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/bookings"
                >
                  Facility Booking
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/payment"
                >
                  Pay Maintenance
                </NavLink>
              </li>

            </ul>
          )}

          {/* Show public links when logged out */}
          {!user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/#about">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/#services">
                  Services
                </a>
              </li>

            </ul>
          )}

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3 ms-auto">

            {user ? (
              <>
                <span className="text-white ss-welcome">
                  Welcome, {user.name}
                </span>

                <button
                  className="btn btn-danger"
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
                  className="btn btn-light"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
