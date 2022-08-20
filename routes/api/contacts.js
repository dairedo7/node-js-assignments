const express = require("express");

const {
  contactShema,
  bookUpdateFavofiteSchema,
  schemaUpdate,
} = require("../../models/validation");

// const contactsOperations = require("../../models/contacts.js");

const Contact = require("../../models/contact");

const { createError } = require("../../helpers");

const router = express.Router();

// Methods implementation

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({});

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    // const result = await Book.findOne({_id: id});
    if (!result) {
      throw createError(404);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = bookUpdateFavofiteSchema.validate(req.body);
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
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact has been deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = schemaUpdate.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
