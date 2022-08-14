const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");

const app = express(); // app - web-server

// Server log implementation
app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");

  await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
  next();
});

// Connecting contacts list
const contactsRouter = require("../api/contacts");

app.listen(5000, () => console.log("Success. Web-server is running"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// We have a request which starts with '../api/contacts.js'
// the system is going look for a handler in contactsRouter file
app.use("../api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
