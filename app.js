const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

// app.use(cors({ origin: "*" }));
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connecte do DB!");
  })
  .catch(console.error);

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Congrats it's up and running! Port ${PORT} `);
});

// app.get("/", (req, res) => {
//   res.setHeader("Content-Type", "text/html");
//   res.send(`<html>
//     <body>
//     <p>test</p>
//     </body>
//     </html>`);
// });

// app.get("/favicon.ico", (req, res) => res.status(204).end());
