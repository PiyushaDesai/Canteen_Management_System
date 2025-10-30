import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "Student") {
      navigate("/student-dashboard");
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email: form.email,
        password: form.password,
      });

      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.token);

      // Optionally save token or user info:
      // localStorage.setItem("token", response.token);

      // Redirect to dashboard or home page
      navigate("/student-dashboard");
    } catch (error) {
      toast.error("Login failed: " + error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
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
          <h4 className="mt-3 text-orange fw-bold">Student Login</h4>
          <p className="text-muted">Please sign in to continue </p>
        </div>
        <form onSubmit={handleSubmit}>
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
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-warning text-white" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
