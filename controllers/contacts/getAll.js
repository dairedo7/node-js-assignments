const { Contact } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const getAll = async (req, res, next) => {
  const { _id } = req.user;

  const { favorite } = req.query;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let filteredResult;
  let result;

  if (favorite) {
    filteredResult = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
  } else {
    result = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
  }

  res.json({
    status: "success",
    code: OK,
    data: {
      result,
      filteredResult,
    },
  });
};

module.exports = getAll;
