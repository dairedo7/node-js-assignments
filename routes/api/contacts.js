const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { joiSchema, favoriteJoiSchema } = require("../../models");

const router = express.Router();

const {
  ctrlWrapper,
  auth,
  validationPost,
  validationUpdate,
  validateId,
} = require("../../middlewares");

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", validateId, ctrlWrapper(ctrl.getById));
router.post("/", auth, validationPost(joiSchema), ctrlWrapper(ctrl.addNew));
router.delete("/:contactId", validateId, ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  validateId,
  validationUpdate(joiSchema),
  ctrlWrapper(ctrl.putById)
);
router.patch(
  "/:contactId/favorite",
  validateId,
  validationUpdate(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
