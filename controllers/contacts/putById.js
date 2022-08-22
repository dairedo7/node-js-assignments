const { Contact } = require("../../models/");
const { schemaUpdate } = require("../../models/validation");
const { createError } = require("../../helpers");
const putById = async (req, res, next) => {
  try {
    const { error } = schemaUpdate.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = putById;
