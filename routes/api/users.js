const express = require("express");

const { users: ctrl } = require("../../controllers");

const {
  auth,
  upload,
  ctrlWrapper,
  validationUpdate,
} = require("../../middlewares");
const { subscriptionJoiSchema } = require("../../models");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/subscription",
  auth,
  validationUpdate(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
