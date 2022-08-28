const { isValidObjectId } = require("mongoose");
const { NotFound } = require("http-errors");

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);

  if (!isValid) {
    next(NotFound(`Contact with id(${contactId}) not found`));
    return;
  }
  next();
};

module.exports = validateId;
