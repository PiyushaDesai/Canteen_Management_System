import express from "express";
import axios from "axios";

const router = express.Router();

const USER_SERVICE_URL =
  "https://canteen-management-system-pidg.onrender.com/admin/users-list";
const FEEDBACK_SERVICE_URL =
  "https://canteen-management-system-production-1b78.up.railway.app/api/Feedback";

router.get("/with-names", async (req, res) => {
  try {
    const [usersRes, feedbackRes] = await Promise.all([
      axios.get(USER_SERVICE_URL),
      axios.get(FEEDBACK_SERVICE_URL),
    ]);

    const users = usersRes.data;
    const feedbacks = feedbackRes.data;

    const merged = feedbacks.map((fb) => {
      const user = users.find((u) => u.email === fb.email);
      return {
        id: fb.id, // ✅ Include feedback ID
        name: user ? user.fullName : "Unknown",
        email: fb.email,

        message: fb.message, // Optional: keep feedback message too

      };
    });

    res.json(merged);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
