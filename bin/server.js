const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app");
const path = require("path");

const { MONGO_URL, PORT = 3000 } = process.env;
const { createFolderIsNotExist } = require("../middlewares");

const tmpDir = path.join(__dirname, "../", "tmp");
const avatarsDir = path.join(__dirname, "../", "public");

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderIsNotExist(tmpDir);
      await createFolderIsNotExist(avatarsDir);
      console.log(`The server is running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(`The server is not running. Error message: ${error.message}`);
    process.exit(1);
  });
