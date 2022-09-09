const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { auth, ctrlWrapper, validationPost } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema } = require("../../models");

const router = express.Router();

router.post(
  "/signup",
  validationPost(joiSignupSchema),
  ctrlWrapper(ctrl.signup)
);
router.post("/login", validationPost(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
