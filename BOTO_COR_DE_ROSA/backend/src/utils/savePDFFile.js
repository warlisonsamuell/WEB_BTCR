const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extensaoArquivo = file.originalname.split('.')[1];

    cb(null, `${uuidv4()}.${extensaoArquivo}`);
  },
});

module.exports = storage;
