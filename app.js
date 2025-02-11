const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Congrats it's up and running! Port ${PORT} `);
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`<html>
    <body>
    <p>test</p>
    </body>
    </html>`);
});

app.get("/favicon.ico", (req, res) => res.status(204).end());
