const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");
// const tmpDir = path.resolve("/tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
  limits: {
    fileSize: 2097152,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
