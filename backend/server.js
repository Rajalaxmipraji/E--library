// ✅ Import required modules
import express from "express";
import cors from "cors";
import db from "./db.js";
import booksRoutes from "./routes/books.js";
import authRoutes from "./routes/auth.js"; // ✅ authentication routes

// ✅ Initialize Express
const app = express();

// ✅ Middlewares
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
app.use("/api/auth", authRoutes); // handles login
app.use("/api", booksRoutes);     // handles PDF access

// ✅ Server port (Render gives its own PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
