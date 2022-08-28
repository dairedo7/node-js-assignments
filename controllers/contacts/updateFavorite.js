const { Contact } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    code: OK,
    data: {
      result,
    },
  });
};

module.exports = updateFavorite;
