import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || !email) {
      toast.error("OTP or Email is missing");
      return;
    }

    try {
      await axios.post(
        "https://canteen-management-system-pidg.onrender.com/verify-otp",
        { email, otp }
      );
      //await axios.post("http://localhost:8080/verify-otp", { email, otp });
      toast.success("Registration complete!");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="p-4 rounded bg-white shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Link
          to="/register"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
            marginBottom: "1rem",
          }}
        >
          <ArrowLeftIcon style={{ height: "20px", marginRight: "8px" }} />
          <strong>Back to Register</strong>
        </Link>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h4 className="mt-3 text-orange fw-bold">Verify OTP</h4>
          <p className="text-muted">Check your email for the OTP code</p>
        </div>
        <form onSubmit={handleVerify}>
          <div className="mb-3">
            <label htmlFor="otp">OTP for {email}</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-warning text-white" type="submit">
              Verify OTP
            </button>
          </div>
        </form>
        <p className="mt-3 text-center">
          Didn’t receive the code?{" "}
          <span style={{ color: "#f57c00" }}>Check spam</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
