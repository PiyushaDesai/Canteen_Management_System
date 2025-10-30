import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { registerUser } from "../Services/authService";

const Registration = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false); // Re-enable after 1 min
    }, 60000);

    try {
      const response = await registerUser({
        fullName: form.fullName,
        email: form.email,
        role: form.role,
        password: form.password,
      });

      toast.success("OTP sent to your email.");
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (error) {
      toast.error("Registration failed: " + error);
    }
  };

  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="fullscreen-wrapper">
      <div
        className="p-4 rounded bg-white shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
            marginBottom: "1rem",
          }}
        >
          <ArrowLeftIcon style={{ height: "20px", marginRight: "8px" }} />
          <strong>Back to Home</strong>
        </Link>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h4 className="mt-3 text-orange fw-bold">Registration</h4>
          <p className="text-muted">Join our canteen management system</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Role</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button
              className="btn btn-warning text-white"
              type="submit"
              disabled={isDisabled} // ✅ disable button
              style={{
                opacity: isDisabled ? 0.6 : 1, // ✅ faint effect
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/">Sign in here</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
