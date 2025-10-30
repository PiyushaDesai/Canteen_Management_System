import express from "express";
import cors from "cors";
import feedbackRouter from "./routes/feedback.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/feedback", feedbackRouter);

app.listen(PORT, () => {
  console.log(`BFF server running at http://localhost:${PORT}`);
});
