
// necessary imports and dependencies

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const detectText = require("./utils/ocrUtils");
const Card = require("./models/Card");
const cors =require('cors');
// Connecting to DB
// const cors = require('cors');
const corsOptions ={
    origin:'https://main--courageous-kheer-19e174.netlify.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db!");
  });

// Parse Google Cloud credentials from the environment variable
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

app.get('/api',(req,res)=>{
  res.send('its working!')
})
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

    // Store in DB.
    const cardData = new Card(result);
    await cardData.save();

    // Respond with the detected text
    res.json(result);
  } catch (error) {
    console.error("Error detecting text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all cards
app.get("/api/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    console.error("Error getting cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch a single card by ID
app.get("/api/cards/:id", async (req, res) => {
  try {
    const card = await Card.findOne({ identificationNumber: req.params.id });
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(card);
  } catch (error) {
    console.error("Error getting card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new card
app.post("/api/cards", async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.json(newCard);
  } catch (error) {
    console.error("Error creating card:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Card with this identification number already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a card by ID
app.delete("/api/cards/:id", async (req, res) => {
  try {
    const deletedCard = await Card.findOneAndDelete({ identificationNumber: req.params.id });
    if (!deletedCard) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(deletedCard);
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a card by ID
app.put("/api/cards/:id", async (req, res) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { identificationNumber: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedCard) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
