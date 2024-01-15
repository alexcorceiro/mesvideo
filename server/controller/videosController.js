const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const admin = require("../config/firebaseAdmin");
const bucket = admin.storage().bucket('gs://voltstream-32617.appspot.com')
const { getVideoMetadonner, generateThumbnail } = require("../utils/metaVideo");
const { uploadToFirebase } = require("../utils/uplaodvideo")
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);
const path = require('path');

exports.createVideo = async (req, res) => {
    const { titre, description, categorieId, studioId} = req.body;
    const videoFile = req.file;

    const categorieIdInt = parseInt(categorieId, 10);
    const studioIdInt = parseInt(studioId, 10);

    if (!videoFile) {
      return res.status(400).json({ message: "Aucun fichier vidéo n'a été fourni." });
    }
  
    try {

        const existingTitle = await prisma.videos.findFirst({ where : { titre: titre}})

        if(existingTitle){
            return res.status(400).json({ message: "ce titre est deja utilier"})
        }
      
       // Génération de la miniature
        // Générer la miniature
        const thumbnailPath = await generateThumbnail(videoFile.buffer, '00:08:10', './miniatures');

        // Téléverser la vidéo et la miniature sur Firebase
        const { videoUrl, thumbnailUrl } = await uploadToFirebase(videoFile.buffer, thumbnailPath);
         

       const metadata = await getVideoMetadonner(videoFile.buffer);
       const durationString = metadata.duration.toString();

      const maxStringLength = 1024; 
      const truncatedTitre = titre.substring(0, maxStringLength);
      const truncatedDescription = description.substring(0, maxStringLength);
      
      // Créez un nouvel enregistrement vidéo dans la base de données
      const newVideo = await prisma.videos.create({
        data: {
          titre: truncatedTitre,
          description: truncatedDescription,
          duree: durationString,
          qualite: metadata.quality,
          dateDePublication: new Date().toISOString(),
          categorieId:categorieIdInt,
          studioId:studioIdInt,
          videoUrl: videoUrl,
          image:thumbnailUrl,
      }});
  
        // Réussite de la création, maintenant supprimez les fichiers temporaires
    // const thumbnailPaths = path.join(__dirname, 'miniatures', 'thumbnail_<IDENTIFIANT>.png'); // Remplacez <IDENTIFIANT> par le nom réel du fichier
    // await unlinkAsync(thumbnailPaths);

    res.status(200).json({ message: "Vidéo créée avec succès", video: newVideo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
};

  
  

exports.getAllVideo = async (req, res) => {
try{
    const videos = await prisma.videos.findMany({})
    res.json(videos)
}catch(err){
    res.status(400).json({message: err.message});
}
}

exports.getVideoById = async (req, res) => {
const { id } = req.params
try{
    const video = await prisma.videos.findUnique({
        where: { id: parseInt(id)}
    })
    video ? res.status(200).json(video) : res.status(404).send("Vidéo non trouvée");
}catch(err){
    res.status(400).json({ message: err.message });
}
}

exports.updateVideo = async (req, res) => {
 const {id} = req.params
 const { titre, description, duree, categorie_id, studio_id } = req.body
 try{
    const updateVideo = await prisma.videos.update({
        where: {id: parseInt(id)}, 
        data: {
            titre, 
            description, 
            duree, 
            categorie_id,
            studio_id
        }
    });

    res.status(200).json({ message: 'video mise a jour avec success', video: updateVideo})
 }catch(err){
    res.status(500).json({ message: err.message});
 }
}

exports.deleteVideo = async (req, res) => {
const { id } = req.params
try{
    const existVideo = await prisma.videos.findFirst({ id: parseInt(id)})

    if(!existVideo){
        return res.status(404).send({ messsage: "video non trouver"})
    }

    const firebaseFileName = existVideo.videoUrl.split('/').pop()
    const firebaseFile = bucket.file(firebaseFileName)
    await firebaseFile.delete()

    await prisma.videos.delete({ where: { id: parseInt(id)}})

    res.status(200).json({ message: "suprimer avec success"})
}catch(err){
    res.status(500).json({ message: err.message })
}
}