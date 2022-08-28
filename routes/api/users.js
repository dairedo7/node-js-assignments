const express = require("express");

const { users: ctrl } = require("../../controllers");

const { auth, ctrlWrapper, validationUpdate } = require("../../middlewares");
const { subscriptionJoiSchema } = require("../../models");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/subscription",
  auth,
  validationUpdate(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
module.exports = router;
