import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = (data) => {
    // Get existing registered users
    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = existingUsers.some(
      (user) => user.email === data.email
    );

    if (userExists) {
      alert("Email is already registered!");
      return;
    }

    // Remove confirmPassword before storing
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      flatNumber: data.flatNumber,
      block: data.block,
      role: "member",
    };

    // Add new user
    existingUsers.push(newUser);

    // Save users
    localStorage.setItem(
      "users",
      JSON.stringify(existingUsers)
    );

    alert("Registration successful!");

    // Go to login page
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">

        <h2>Create Account</h2>
       

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Full Name */}
          <div className="register-form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Full name is required",

                minLength: {
                  value: 3,
                  message:
                    "Name must contain at least 3 characters",
                },

                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Name can contain only letters",
                },
              })}
            />

            {errors.name && (
              <p className="register-error">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="register-form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your  email"
              {...register("email", {
                required: "Email is required",

                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <p className="register-error">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="register-form-group">
            <label>Phone Number</label>

            <input
              type="text"
              placeholder="Enter your phone"
              maxLength="10"
              {...register("phone", {
                required: "Phone number is required",

                pattern: {
                  value: /^[6-9][0-9]{9}$/,
                  message:
                    "Enter a valid 10-digit phone number",
                },
              })}
            />

            {errors.phone && (
              <p className="register-error">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Flat Number & Block */}
          <div className="register-row">

            <div className="register-form-group">
              <label>Flat Number</label>

              <input
                type="text"
                placeholder="e.g. A-204"
                {...register("flatNumber", {
                  required: "Flat number is required",
                })}
              />

              {errors.flatNumber && (
                <p className="register-error">
                  {errors.flatNumber.message}
                </p>
              )}
            </div>

            <div className="register-form-group">
              <label>Block</label>

              <input
                type="text"
                placeholder="e.g. A"
                {...register("block", {
                  required: "Block is required",
                })}
              />

              {errors.block && (
                <p className="register-error">
                  {errors.block.message}
                </p>
              )}
            </div>

          </div>

          {/* Password */}
          <div className="register-form-group">
            <label>Password</label>

            <div className="password-wrapper">

              <input
              placeholder="Enter your password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                {...register("password", {
                  required: "Password is required",

                  minLength: {
                    value: 8,
                    message:
                      "Password must contain at least 8 characters",
                  },

                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                    message:
                      "Password must contain uppercase, lowercase, number and special character",
                  },
                })}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {errors.password && (
              <p className="register-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="register-form-group">
            <label>Confirm Password</label>

            <div className="password-wrapper">

              <input
              placeholder="Confirm your password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                {...register("confirmPassword", {
                  required:
                    "Please confirm your password",

                  validate: (value) =>
                    value === password ||
                    "Passwords do not match",
                })}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            {errors.confirmPassword && (
              <p className="register-error">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="register-terms">

            <input
              type="checkbox"
              {...register("terms", {
                required:
                  "You must accept the terms and conditions",
              })}
            />

            <label>
              I agree to the Terms & Conditions
            </label>

          </div>

          {errors.terms && (
            <p className="register-error">
              {errors.terms.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="register-button"
            disabled={!isValid}
          >
            Create Account
          </button>

        </form>

        <div className="register-login-link">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;
