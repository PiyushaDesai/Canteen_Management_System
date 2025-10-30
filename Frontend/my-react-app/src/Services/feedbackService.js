// feedbackService.js
import axios from "axios";

// ✅ Fetch endpoint (gateway)
const FEEDBACK_WITH_NAMES_URL =
  "https://api-gateway-production-c5b3.up.railway.app/feedback/with-names";

// ✅ Add & Delete endpoint (direct service)
const FEEDBACK_SERVICE_URL =
  "https://canteen-management-system-production-1b78.up.railway.app/api/Feedback";

/**
 * Get all feedback entries from backend
 */
export const getAllFeedback = async () => {
  try {
    const response = await axios.get(FEEDBACK_WITH_NAMES_URL);
    console.log("Fetched all feedbacks:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching feedbacks:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Submit new feedback
 * @param {Object} feedbackData - { name, email, message }
 */
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(FEEDBACK_SERVICE_URL, feedbackData);
    console.log("Feedback submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting feedback:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Delete a feedback entry by ID
 * @param {number} id
 */
export const deleteFeedback = async (id) => {
  try {
    const response = await axios.delete(`${FEEDBACK_SERVICE_URL}/${id}`);
    console.log(`Feedback with ID ${id} deleted successfully.`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting feedback with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
