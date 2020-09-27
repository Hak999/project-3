const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

var upload = multer({ storage: storage }).single("profileImage");

module.exports = async function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("something went wrong");
    } else if (err) {
      console.log("something went wrong");
      // An unknown error occurred when uploading.
    }
    req.image = req.file.path;
    console.log("our file", req.file);
    next();
    // Everything went fine.
  });

  //All logic for adding data
};
