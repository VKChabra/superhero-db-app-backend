const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const destinationPath = path.join(__dirname, "..", "uploads");
    cb(null, destinationPath);
  },
  filename(req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    // console.log("Generated file name:", fileName);
    cb(null, fileName);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only images (jpg, jpeg, png, webp) are allowed."
      )
    );
  }
}

module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images", 5);
