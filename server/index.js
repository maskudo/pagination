const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const entryRoutes = require("./src/routes/entryRoutes");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/entries", entryRoutes);
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode ?? 500;
  res.status(error.statusCode).json({
    message: error.message,
  });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected to mongo db");
  app.listen(process.env.PORT, () => {
    console.log(`server started on Port ${process.env.PORT}`);
  });
});
