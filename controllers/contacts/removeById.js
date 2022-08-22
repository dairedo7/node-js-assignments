const { Contact } = require("../../models/");
const { createError } = require("../../helpers");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact has been deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
