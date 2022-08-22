const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },

    email: {
      type: String,
      required: [true, "Set email for contact"],
    },

    phone: {
      type: String,
    },

    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

contactSchema.path("name").validate(function (value) {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactSchema };
