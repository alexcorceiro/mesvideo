const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const uploadImageMiddleware = upload.single('imageFile');


module.exports = { uploadImageMiddleware}