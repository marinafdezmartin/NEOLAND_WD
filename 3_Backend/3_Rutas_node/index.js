import express from "express";
import "dotenv/config";

const api = express();
api.use(express.json());
const port = process.env.port;

api.get("/", (req, res) => {
  res.status(200).send("Todo bien");
});

api.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
