const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app");

const { MONGO_URL, PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(`The server is not running. Error message: ${error.message}`);
    process.exit(1);
  });
