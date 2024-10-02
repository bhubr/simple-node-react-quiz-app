const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { readQuizzes } = require("./models/quiz");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.get("/quizzes", async (req, res) => {
  res.send(await readQuizzes());
});

module.exports = app;
