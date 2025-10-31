import express from "express";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const SECRET = "mysecretkey"; // keep secure

// 🔑 Login API
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
});

// 🔒 Verify Token Middleware
export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

export default router;
