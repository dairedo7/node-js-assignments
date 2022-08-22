const express = require("express");

const { contacts: ctrl } = require("../../controllers/");

const router = express.Router();

// Methods implementation

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.addNew);

router.delete("/:id", ctrl.removeById);

router.patch("/:id/favorite", ctrl.updateFavorite);

router.put("/:id", ctrl.putById);

module.exports = router;
