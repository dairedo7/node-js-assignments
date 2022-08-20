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

// const mongoose = require("mongoose");
// require("dotenv").config();
// const app = require("./app");

// const { MONGO_URL, PORT = 3000 } = process.env;

// mongoose
//   .connect(MONGO_URL)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`The server is running. Use our API on port: ${PORT}`);
//     });
//     console.log("Database connection successful");
//   })
//   .catch((error) => {
//     console.log(`The server is not running. Error message: ${error.message}`);
//     process.exit(1);
//   });

// const { MongoClient } = require("mongodb");
// const start = async () => {
//   const client = await MongoClient.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   const db = client.db();
//   const Contacts = db.collection("contacts");
//   const contacts = await Contacts.find({});
//   console.log(contacts);
//   app.listen(5000, (err) => {
//     if (err) console.log("Error at server launch", err);
//     console.log("Success. Web-server is running");
//   });
// };

// start();
