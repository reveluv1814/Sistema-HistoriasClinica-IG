const multer = require("multer");
const path = require("path");

//imagen

const configureMulter = (destination, name) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "_" + name + "-" + uniqueSuffix + ext);
    },
  });

  return multer({ storage: storage });
};

module.exports = configureMulter;
