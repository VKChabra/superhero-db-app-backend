// index.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("./db");
const Superhero = require("./models/superhero");

const app = express();
const PORT = 3001;

// Middleware to handle JSON data
app.use(express.json());

// Middleware to handle images
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

// Routes
app.post("/superheroes", upload.array("images", 5), async (req, res) => {
  // Handle superhero creation here
});

app.get("/superheroes", async (req, res) => {
  // Handle superhero listing here
});

app.get("/superheroes/:id", async (req, res) => {
  // Handle superhero details here
});

app.put("/superheroes/:id", upload.array("images", 5), async (req, res) => {
  // Handle superhero update here
});

app.delete("/superheroes/:id", async (req, res) => {
  // Handle superhero deletion here
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
