const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const multer = require("multer");
const { STATUS_CODES } = require("./middlewares");
require("dotenv").config();
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");

const app = express();
const { NOT_FOUND, SERVER_ERROR } = STATUS_CODES;
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = SERVER_ERROR, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
