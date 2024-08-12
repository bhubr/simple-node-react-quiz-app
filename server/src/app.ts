import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

export default app;
