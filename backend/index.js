const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const detectText = require("./utils/ocrUtils");


const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);


const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};


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


const upload = multer({ storage: storage });


app.post("/api/uploadImage", upload.single("file"), async (req, res) => {
  try {
    const uploadedFile = req.file;
    const result = await detectText(uploadedFile.path,CONFIG);
    res.json(result.fullTextAnnotation.text);
  } catch (error) {
    console.error("Error detecting text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
