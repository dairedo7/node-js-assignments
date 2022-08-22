const { Contact } = require("../../models/");

const { contactShema } = require("../../models/validation");
const { createError } = require("../../helpers");

const addNew = async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNew;
