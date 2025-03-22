require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const indexRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connecte do DB!");
  })
  .catch(console.error);

app.use(cors());

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "67b9c6d638e9e5fd25dd1ffa",
//   };
//   console.log("Adding this to res", req.user);
//   next();
// });
app.use(requestLogger);

app.use("/", indexRouter);
// console.log("Process.env", process.env);
// Enabling the error logger
app.use(errorLogger);
// Celebrate Error Handler
app.use(errors());
// Centralized Error Handler
app.use(errorHandler);
// Testing pull request
app.listen(PORT, () => {
  console.log(`Congrats it's up and running! Port ${PORT} `);
});
