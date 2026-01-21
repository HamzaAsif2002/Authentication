require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouters = require("./router/userRouter.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/", userRouters);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
