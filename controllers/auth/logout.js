const { User } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { NO_CONTENT } = STATUS_CODES;

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(NO_CONTENT).json();
};

module.exports = logout;
