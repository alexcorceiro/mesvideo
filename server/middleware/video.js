const multer = require("multer");

// Configuration du stockage en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware pour le téléchargement d'une seule vidéo
const uploadVideo = upload.single('video');

module.exports = uploadVideo;
