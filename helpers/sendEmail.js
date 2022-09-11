const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

// Object with settings to put into middlewares
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: "dairedo7@meta.ua",
    pass: META_PASSWORD,
  },
};

// Transported sends the letter to the user
const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: "dairedo7@meta.ua" };
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

// const email = {
//   to: "vlad1998@online.ua", // Change to your recipient
//   from: "dairedo7@meta.ua", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

// transporter
//   .sendMail(email)
//   .then(() => {
//     console.log("Email sent successfully");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
