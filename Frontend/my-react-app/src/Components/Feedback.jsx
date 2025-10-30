import React, { useEffect, useState } from "react";
import { getAllFeedback, deleteFeedback } from "../Services/feedbackService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash } from "react-feather";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all feedback
  const fetchFeedbacks = async () => {
    try {
      const response = await getAllFeedback();
      console.log("Fetched feedback list:", response); // Check the structure
      console.log(response);
      setFeedbacks(response || []);
    } catch (error) {
      console.error("Failed to fetch feedbacks", error);
      toast.error("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Handle delete feedback
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?"))
      return;

    try {
      console.log(id);
      await deleteFeedback(id);
      toast.success("Feedback deleted successfully");
      // Remove from state after delete
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete feedback");
    }
  };

  if (loading) return <p>Loading feedbacks...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Feedback</h2>

      {Array.isArray(feedbacks) && feedbacks.length === 0 ? (
        <p>No feedbacks yet.</p>
      ) : (
        <div className="row">
          {feedbacks.map((feedback) => (
            <div className="col-md-6 mb-3" key={feedback.id}>
              <div className="card shadow-sm p-3 rounded-3 position-relative">
                {/* Delete Icon */}
                <button
                  onClick={() => handleDelete(feedback.id)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <Trash size={18} color="red" />
                </button>

                {/* Feedback content */}
                <h5 className="text-primary fw-semibold">
                  {feedback.name || feedback.email || "Unknown"}
                </h5>
                <p className="mb-0">{feedback.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
