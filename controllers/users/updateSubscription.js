const { User } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const updateSubscription = async (req, res) => {
  const { email } = req.user;
  const { subscription } = req.body;

  await User.findOneAndUpdate(email, { subscription }, { new: true });

  res.json({
    status: "success",
    code: OK,
    data: {
      subscription,
    },
  });
};

module.exports = updateSubscription;
