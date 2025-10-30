import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPaymentOrder, updatePaymentStatus } from "../Services/PaymentService";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ProceedToPayment = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = location.state?.order;

  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      setRazorpayLoaded(loaded);
    });
  }, []);

  if (!orderData) {
    return (
      <div className="container text-center mt-5">
        <p className="text-danger">No order data found. Please go back and place your order.</p>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK failed to load. Please try again later.");
      return;
    }
    setLoading(true);
    try {
      const data = await createPaymentOrder({
        orderId: orderData.id,
        amount: orderData.totalAmount,
      });

      if (!data || !data.razorpayKey) {
        alert("Payment initialization failed: missing razorpayKey");
        setLoading(false);
        return;
      }

      const options = {
        key: data.razorpayKey,
        amount: data.amount,
        currency: "INR",
        name: "Canteen Management",
        description: `Payment for Order ${orderData.tokenNo}`,
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          try {
            await updatePaymentStatus(data.id, "SUCCESS");
            navigate("/payment-success", { state: { orderId: orderData.id, tokenNo: orderData.tokenNo } });
          } catch (err) {
            console.error("Failed to update payment status", err);
            alert("Payment succeeded but status update failed. Please contact support.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0d6efd", // Bootstrap primary color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4 text-center">Proceed to Payment</h2>
      <div className="card p-4 shadow-sm">
        <p>
          <strong>Order ID:</strong> {orderData.tokenNo}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{orderData.totalAmount}
        </p>
        <button
          className="btn btn-primary w-100"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default ProceedToPayment;
