import React, { useState } from "react";
import { submitFeedback } from "../Services/feedbackService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const FeedbackPage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const storedEmail = storedUser.email || "";
  const [form, setForm] = useState({
    name: "",
    email: storedEmail,
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form.email);

    if (!form.email || !form.message) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      await submitFeedback(form);
      toast.success("Feedback submitted!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit feedback.");
    }
  };

  return (
    <div className="fullscreen-wrapper d-flex justify-content-center align-items-center bg-light py-5">
      <div
        className="p-4 rounded bg-white shadow"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Link
          to="/student-dashboard"
          className="mb-3 d-flex align-items-center text-decoration-none text-dark"
        >
          <ArrowLeftIcon style={{ height: "20px", marginRight: "8px" }} />
          <strong>Back to Dashboard</strong>
        </Link>

        <div className="text-center mb-4">
          <h4 className="text-warning fw-bold">We Value Your Feedback</h4>
          <p className="text-muted">
            Tell us how we can improve your experience
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder={storedEmail || "you@example.com"}
              value={storedEmail}
              onChange={handleChange}
              required
              readOnly
            />
          </div>

          <div className="mb-3">
            <label>Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="3"
              placeholder="Type your feedback here..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="d-grid mb-4">
            <button className="btn btn-warning text-white" type="submit">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
