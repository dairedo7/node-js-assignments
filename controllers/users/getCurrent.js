const { User } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  const { subscription } = user;

  res.json({
    status: "success",
    code: OK,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
