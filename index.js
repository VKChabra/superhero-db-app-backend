const express = require("express");

const superheroesRouter = require("./routes/superheroes");

const app = express();
const PORT = 3001;

// Middleware to handle JSON data
app.use(express.json());

app.use("/superheroes", superheroesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
