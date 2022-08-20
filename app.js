const express = require("express");
// const { MongoClient } = require("mongodb");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connecting contacts list
const contactsRouter = require("./routes/api/contacts");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// We have a request which starts with '../api/contacts.js'
// the system is going look for a handler in contactsRouter file
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
