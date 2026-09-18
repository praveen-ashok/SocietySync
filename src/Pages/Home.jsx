import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* Hero */}
      <section className="hero-section">
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">
              <span className="hero-eyebrow">
                Society Management System
              </span>

              <h1 className="hero-title">
                Smart Society Management Made Simple
              </h1>

              <p className="hero-desc">
                SocietySync helps members and administrators manage
                daily society activities efficiently.
              </p>

              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started
                </Link>

                <Link to="/login" className="btn btn-outline-dark btn-lg">
                  Login
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-panel">

                <div className="hero-panel-row">
                  <span className="hero-panel-icon">🏠</span>
                  <div>
                    <h4>124 Flats</h4>
                    <p>Managed on SocietySync</p>
                  </div>
                </div>

                <div className="hero-panel-row">
                  <span className="hero-panel-icon">✅</span>
                  <div>
                    <h4>98% Resolved</h4>
                    <p>Complaint closure rate</p>
                  </div>
                </div>

                <div className="hero-panel-row">
                  <span className="hero-panel-icon">📅</span>
                  <div>
                    <h4>4 Facilities</h4>
                    <p>Available to book</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">
              <h2 className="section-title">About SocietySync</h2>

              <p className="section-text">
                SocietySync brings members and administrators onto a
                single, organized workspace. From logging a complaint
                to booking the clubhouse for a birthday party, every
                everyday society task finds a clear, simple home here.
              </p>

              <p className="section-text">
                Built for real housing societies, SocietySync focuses on
                clarity over clutter — clean dashboards, honest status
                tracking, and no unnecessary steps.
              </p>
            </div>

            <div className="col-lg-6">
              <ul className="feature-list">
                <li>✔ Role-based dashboards for members and admins</li>
                <li>✔ Instant local data saving, nothing gets lost</li>
                <li>✔ Fully responsive on every screen size</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="section-title">Our Services</h2>
            <p className="section-text mx-auto">
              Everything a member or committee member needs to run the
              society smoothly.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">📝</div>
                <h5>Complaint Management</h5>
                <p>
                  Raise and track complaints across water, electricity,
                  security and more.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">📢</div>
                <h5>Society Announcements</h5>
                <p>
                  Stay informed with timely notices about meetings and
                  events.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">📅</div>
                <h5>Facility Booking</h5>
                <p>
                  Book the community hall, gym, garden or clubhouse in
                  a few clicks.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">👥</div>
                <h5>Member Management</h5>
                <p>
                  Admins get a clear directory of every member with
                  flat and block details.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Call to action */}
      {/* <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to simplify society management?</h2>
          <p>Create your free account and get started in less than a minute.</p>

          <Link to="/register" className="btn btn-warning btn-lg mt-3">
            Register Now
          </Link>
        </div>
      </section> */}

    </div>
  );
}

export default Home;
