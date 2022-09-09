const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");

const { STATUS_CODES } = require("../../middlewares");
const { sendEmail } = require("../../helpers");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw STATUS_CODES(404, "Not found");
  }

  if (user.verify) {
    throw new Unauthorized("User has already been verified");
  }

  const mail = {
    to: email,
    subject: "Registration email confirmation",
    html: `<a href='http://localhost:3000/api/users/verify/${user.verificationToken}' target='_blank'>Press the button to finish the registration</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Email verification letter has been resent",
  });
};

module.exports = resendVerificationEmail;
