const { User } = require("../../models/user");
const { STATUS_CODES } = require("../../middlewares");
const { NOT_FOUND } = require("../../middlewares/codeStatus");

const { OK } = STATUS_CODES;

const verifyEmail = async (req, res) => {
  // finding the dynamically generated token
  const { verificationToken } = req.params;
  // looking in DB for the user, who has the same token
  const user = await User.findOne({ verificationToken });

  console.log(user.verify);
  console.log(verificationToken);

  if (!user) {
    throw new NOT_FOUND("User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ status: OK, message: "Email address was successfully verified" });
};

module.exports = verifyEmail;
