import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <h1>403</h1>
      <h2>Access Denied</h2>

      <p>
        You don't have permission to view this page. Please log in
        with an account that has the correct access level.
      </p>

      <button onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
}

export default Unauthorized;
