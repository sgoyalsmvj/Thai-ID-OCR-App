const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const detectText = require("./utils/ocrUtils");

// Parse Google Cloud credentials from environment variable
let credentials;
try {
  credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
} catch (error) {
  console.error("Error parsing Google Cloud credentials:", error);
  process.exit(1); // Terminate the application if credentials are not valid
}

// Validate required fields in Google Cloud credentials
if (!credentials.private_key || !credentials.client_email) {
  console.error("Missing required fields in Google Cloud credentials.");
  process.exit(1);
}

// Create configuration object for Google Cloud Vision
const CONFIG = {
  credentials: {
    private_key: credentials.private_key,
    client_email: credentials.client_email,
  },
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Multer instance with storage configuration
const upload = multer({ storage: storage });

// Define the port from the environment variable or use a default value (e.g., 3000)
const PORT = process.env.PORT || 3000;

// Endpoint to handle image uploads and text detection
app.post("/api/uploadImage", upload.single("file"), async (req, res) => {
  try {
    // Check if a file was provided in the request
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Perform text detection using Google Cloud Vision
    const uploadedFile = req.file;
    const result = await detectText(uploadedFile.path, CONFIG);

    // Respond with the detected text
    res.json(result);
  } catch (error) {
    console.error("Error detecting text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
