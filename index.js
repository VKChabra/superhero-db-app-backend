const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./db");

const superheroesRouter = require("./routes/superheroes");

const app = express();
const PORT = 3001;

app.use(cors());

app.use(bodyParser.json());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(express.static(path.join(__dirname, "/uploads")));
app.use("/superheroes", superheroesRouter);

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
