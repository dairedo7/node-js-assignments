const { Contact } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { CREATED } = STATUS_CODES;

const addNew = async (req, res, next) => {
  const { _id } = req.user;

  const result = await Contact.create({ ...req.body, owner: _id });

  if (result)
    res.status(CREATED).json({
      status: "success",
      code: CREATED,
      data: {
        result,
      },
    });
};

module.exports = addNew;
