const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running Application Successfully..!");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Successfully Connected"))
  .catch((error) => console.log(error));

app.use("/auth", require("./routes/Login"));

const port = process.env.PORT || 8100;

app.listen(port, () => {
  console.log(`Server Running on Port - ${port}`);
});