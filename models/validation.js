const Joi = require("joi");
// Schema validation for PUT, POST and PATCH methods
const contactShema = Joi.object({
  name: Joi.string().min(4).max(25).required(),
  email: Joi.string().email().required(),
  favorite: Joi.boolean().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
});

const bookUpdateFavofiteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]+$/),
}).min(1);

module.exports = {
  contactShema,
  bookUpdateFavofiteSchema,
  schemaUpdate,
};
