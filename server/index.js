const express = require("express");
const cors = require("cors");
const noteRoutes = require("./src/routes/noteRoutes");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server started on Port ${process.env.PORT}`);
});
