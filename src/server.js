import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

const app = express();

const port = 4000;

const url =
  "mongodb+srv://javascriotmastery:javascriptmastery123@cluster0.2rbfa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.static(path.join(__dirname, "/build")));
app.use(cors());
app.use(express.json());

mongoose.connect(url);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

import articlesRouter from "./routes/articles";

app.use("/articles", articlesRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
