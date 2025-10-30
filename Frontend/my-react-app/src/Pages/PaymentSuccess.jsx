import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, tokenNo } = location.state || {};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-5 text-center" style={{ maxWidth: "420px" }}>
        <h1 className="text-success mb-4">🎉 Payment Successful!</h1>
        {orderId && (
          <p className="fs-5">
            <strong>Order ID:</strong> {orderId}
          </p>
        )}
        {tokenNo && (
          <p className="fs-5">
            <strong>Token Number:</strong> {tokenNo}
          </p>
        )}
        <p className="mb-4 text-muted">Thank you for your purchase.</p>
        <button
          className="btn btn-success"
          onClick={() => navigate("/student-dashboard")}
        >
          Go to StudentDashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
