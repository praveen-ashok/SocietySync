import "../Pages/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          {/* About */}
          <div className="col-md-4">
            <h3>SocietySync</h3>

            <p>
              A simple, reliable way for members and administrators
              to manage day-to-day society activities together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h4>Quick Links</h4>

            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h4>Contact Us</h4>

            <p>📍 Sunrise Residency, Pune, India</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ contact@societysync.com</p>
          </div>

        </div>

        <hr />

        <div className="footer-bottom">
          <p>
            © 2026 SocietySync. All Rights Reserved.
          </p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
