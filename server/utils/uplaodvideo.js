const admin = require("../config/firebaseAdmin");
const bucket = admin.storage().bucket('gs://voltstream-32617.appspot.com');
const { v4: uuidv4 } = require("uuid");

exports.uploadToFirebase = async (videoBuffer, thumbnailBuffer) => {
   const uuid = uuidv4();
   const folderName = `mesVideo/${uuid}`;
   const videoFileName = `${uuid}.mp4`;
   const thumbnailFileName = `${uuid}-thumbnail.png`;
   const maxUrlLength = 255;

   try {
       // Assurez-vous que les buffers sont valides
       if (!Buffer.isBuffer(videoBuffer) || !Buffer.isBuffer(thumbnailBuffer)) {
           throw new Error("Les fichiers doivent être des Buffers.");
       }

       // Téléversement des fichiers sur Firebase
       const videoFirebaseFile = bucket.file(`${folderName}/${videoFileName}`);
       await videoFirebaseFile.save(videoBuffer, { public: true });
       const thumbnailFirebaseFile = bucket.file(`${folderName}/${thumbnailFileName}`);
       await thumbnailFirebaseFile.save(thumbnailBuffer, { public: true });

       // Obtention des URL signées
       const oneYearFromNow = new Date();
       oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
       const [videoUrl] = await videoFirebaseFile.getSignedUrl({
           action: "read",
           expires: oneYearFromNow.toISOString()
       });
       const [thumbnailUrl] = await thumbnailFirebaseFile.getSignedUrl({
           action: "read",
           expires: oneYearFromNow.toISOString()
       });

       // Tronquer les URL si elles sont trop longues
       const truncatedVideoUrl = videoUrl.length > maxUrlLength ? videoUrl.substring(0, maxUrlLength) : videoUrl;
       const truncatedThumbnailUrl = thumbnailUrl.length > maxUrlLength ? thumbnailUrl.substring(0, maxUrlLength) : thumbnailUrl;

       return { videoUrl: truncatedVideoUrl, thumbnailUrl: truncatedThumbnailUrl };
   } catch (err) {
       console.error("Erreur lors de l'upload sur Firebase:", err);
       throw err;
   }
};
