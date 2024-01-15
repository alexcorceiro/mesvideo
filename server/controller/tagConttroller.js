const { PrismaClient }  = require ("@prisma/client")
const prisma = new PrismaClient()


exports.createTag = async (req, res) => {
    const { libelle } = req.body
    
    const existing = await prisma.tags.findFirst({
        where: { libelle: libelle}
    })

    if(existing){
        return res.this.status(400).json({ message : "tag deja existant"})
    }

    try{
        const tag = await prisma.tags.create({ data: { libelle}})

        res.status(200).json({ message : "tag cree avec success"  , tags: tag })
    }catch(err){
        res.status(500).json({ message : err.message })
    }
}

exports.getAllTag = async (req, res) => {
    try{
        const tags = await prisma.tags.findAll({})
        res.status(200).json(tags)
    }catch(err){
        res.status(500).json({ message: err.message})
    }

}

exports.getTagById = async (req, res) => { 
    const {id } = req.params
    try{
        const tag = await prisma.tags.findUnique({
            where : { id: parseInt(id)}
        })

        res.status(200).json(tag)
    }catch(err){
        res.status(400).json({ message: err.message})
    }

}

exports.updateTag = async (req, res) => {
const { id } = req.params
const {  libelle } = req.body 
try{
    const updateTag = await prisma.tags.update({
        where: { id : parseInt(id)}, 
        data : { libelle}
    })


    res.status(200).json({ message: "tag updated successfully"})
}catch(err){
    res.status(400).json({ message: err.message})
}
}

exports.deleteTag = async (req, res) => {
const {id} = req.params
try{
    await prisma.tags.delete({
        where: { id: parseInt(id)}
    })

    res.status(200).json({ message: "tag deleted successfully"})
}catch(err){
    res.status(400).json({ message: err.message})
}
}