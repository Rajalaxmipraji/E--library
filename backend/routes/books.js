import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Fetch list of all PDFs
router.get("/books", (req, res) => {
  const folderPath = path.join(__dirname, "../uploads/pdfs");

  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).send("Error reading files");

    // Return only .pdf files
    const pdfFiles = files.filter(file => file.endsWith(".pdf"));
    res.json(pdfFiles);
  });
});

// ✅ Fetch a specific PDF file
router.get("/pdf/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads/pdfs", req.params.filename);
  res.sendFile(filePath);
});

export default router;
