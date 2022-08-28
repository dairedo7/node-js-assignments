const express = require("express");
const logger = require("morgan");
const cors = require("cors");
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

// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Connecting contacts list
// const contactsRouter = require("./routes/api/contacts");

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// // We have a request which starts with '../api/contacts.js'
// // the system is going look for a handler in contactsRouter file
// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({
//     message: "Not found",
//   });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

// module.exports = app;
