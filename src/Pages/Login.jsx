import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import seedUsers from "../data/users";
import "./Login.css";

function getAllUsers() {
  const registered =
    JSON.parse(localStorage.getItem("users")) || [];

  return [...seedUsers, ...registered];
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    const allUsers = getAllUsers();

    const user = allUsers.find(
      (user) =>
        user.email === data.email &&
        user.password === data.password
    );

    if (!user) {
      setLoginError("Invalid email or password");
      return;
    }

    setLoginError("");

    // Store logged-in user
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );

    // Role-based redirect
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/member-dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Email */}
          <div className="login-form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <p className="login-error">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="login-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message:
                    "Password must contain at least 8 characters",
                },
              })}
            />

            {errors.password && (
              <p className="login-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Error */}
          {loginError && (
            <p className="login-error">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={!isValid}
          >
            Login
          </button>

        </form>

        {/* <div className="login-demo-box">
          <p className="login-demo-title">Demo credentials</p>
          <p className="login-demo-line">
            Admin — admin@societysync.com / Admin@123
          </p>
          <p className="login-demo-line">
            Member — member@societysync.com / Member@123
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
