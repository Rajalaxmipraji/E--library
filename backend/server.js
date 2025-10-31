import express from "express";
import cors from "cors";
import db from "./db.js";
import booksRoutes from "./routes/books.js";
import authRoutes from "./routes/auth.js"; // ✅ add this import

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Database connection check
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database successfully!");
  }
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", booksRoutes);

// ✅ Server Start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
