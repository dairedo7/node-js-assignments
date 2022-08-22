const { Contact } = require("../../models/");
const { bookUpdateFavoriteSchema } = require("../../models/validation");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = bookUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
