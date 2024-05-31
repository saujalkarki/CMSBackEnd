const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (!allowedFileTypes.includes(file.mimetype)) {
      return cb(new Error("File type not allowed."));
    }

    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `-${file.fieldname}--${file.originalname}`);
  },
});

module.exports = storage;
