const { User } = require("../../models/user");

const { Unauthorized } = require("http-errors");

const verifyEmail = async (req, res) => {
  // finding the dynamically generated token
  const { verificationToken } = req.params;
  // looking in DB for the user, who has the same token
  const user = await User.findOne({});

  if (!user) {
    throw new Unauthorized("The verification token can not be found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Email address was successfully verified",
  });
};

module.exports = verifyEmail;
