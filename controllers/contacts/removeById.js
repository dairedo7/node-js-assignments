const { Contact } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  res.json({
    status: "success",
    code: OK,
    message: "contact delete",
    data: {
      result,
    },
  });
};

module.exports = removeById;
