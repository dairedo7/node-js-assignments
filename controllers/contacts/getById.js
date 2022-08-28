const { Contact } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  res.json({
    status: "success",
    code: OK,
    data: {
      result,
    },
  });
};

module.exports = getById;
