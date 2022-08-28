const { Contact } = require("./contact");
const { joiSchema, favoriteJoiSchema } = require("./contact");
const { User } = require("./user");
const {
  joiSignupSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
} = require("./user");

module.exports = {
  Contact,
  User,
  joiSignupSchema,
  joiLoginSchema,
  joiSchema,
  favoriteJoiSchema,
  subscriptionJoiSchema,
};
