const { Contact } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const putById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.json({
    status: "success",
    code: OK,
    data: {
      result,
    },
  });
};

module.exports = putById;
