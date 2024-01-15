const { PrismaClient } = require("@prisma/client")
const prisma  = new PrismaClient()
const admin = require("../config/firebaseAdmin")
const bucket  = admin.storage().bucket('gs://voltstream-32617.appspot.com')


exports.createStudio = async (req, res) => {
    const { nom } = req.body;
    const imageFile = req.file;
    
    const existing = await prisma.studios.findFirst({
        where: { nom: nom }
    })

    if(existing){
        return res.status(400).json({ message: "studio deja existante"})
    }

    // Vérifiez si un fichier a été chargé
    if (!imageFile) {
        return res.status(400).json({ message: "No image file provided." });
    }

    const imagePath = `imageStudio/${imageFile.originalname}`;
    const firebaseFile = bucket.file(imagePath);

    try {
        // Sauvegardez le fichier image dans Firebase Storage
        await firebaseFile.save(imageFile.buffer, {
            metadata: { contentType: imageFile.mimetype }
        });

        // Rendez le fichier public
        await firebaseFile.makePublic();

        // Générez l'URL de l'image publique
        const imageUrl = firebaseFile.publicUrl();

        // Créez une nouvelle entrée de studio dans la base de données avec l'URL de l'image
        const newStudio = await prisma.studios.create({ data: { nom, image: imageUrl } });
        res.status(201).json(newStudio);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};


exports.getAllStudio = async (req, res) => {
try{
    const studios = await prisma.studios.findMany({})
    res.status(200).json(studios)
}catch(err){
    res.status(500).json({ message: err.message })
}
}

exports.getStudioById = async (req, res) => {
   const { id } = req.params
   try{
    const studio = await prisma.studios.findUnique({
        where: { id: parseInt(id)}
    })
    res.status(200).json(studio)
   }catch(err){
    res.status(400).json({ message: err.message })
   }

}

exports.updateStudio = async (req, res) => {
  const{ id } = req.params
  const { nom } = req.body
  const imageFile = req.file

  try{
    let urlimage ;
    if(imageFile){
        const imagePath = `imageStudio/${imageFile.originalname}`
        const firebaseFile = bucket.file(imagePath)

        await firebaseFile.save(imageFile.buffer, {
            metadata : {
                 contentType : imageFile.mimetype
            }
        });

        await firebaseFile.makePublic()
        urlimage = firebaseFile.publicUrl()
    }

    const updateStudio ={
       nom: nom || undefined,
        ...(urlimage && { image: urlimage})
    }

    //evitez de mettre a jour des proprietes undefined
    Object.keys(updateStudio).forEach(
        (key) => updateStudio[key] === undefined && delete updateStudio[key]
    );
     
    const updateStudioInfo = await prisma.studios.update({
        where: { id: parseInt(id)},
        data: updateStudio
    })
    
      res.status(200).json(updateStudioInfo)  
    
  }catch(err){
    res.status(400).json({ message: err.message})
  }
}

exports.deleteStudio = async (req, res) => {
    const { id } = req.params;

    try {
        const studio = await prisma.studios.findUnique({ where: { id: parseInt(id) } });

        if (!studio) {
            return res.status(404).json({ message: "Studio non trouvé" });
        }

        if (studio.image) {
            const imageName = studio.image.replace('https://storage.googleapis.com/voltstream-21c8c.appspot.com/', '');
            const firebaseFile = bucket.file(decodeURIComponent(imageName));

            // Vérifiez si le fichier existe avant de le supprimer
            const [exists] = await firebaseFile.exists();
            if (exists) {
                await firebaseFile.delete();
            }
        }

        await prisma.studios.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Studio et son image supprimés avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
