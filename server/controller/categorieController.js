const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createCategorie = async (req, res) => {
const { nom } = req.body

try{
    const existCategorie = await prisma.categories.findFirst({
        where: { nom: nom }
    })

    if(existCategorie){
        return res.status(400).json({ message: "une categorie exist"})
    }
    const category = await prisma.categories.create({
        data : { nom}
    })

    res.status(200).json(category)
}catch(err){
    res.status(400).json({message: err.message})
}
}

exports.getAllCategorie = async (req, res) => {
try{
    const category = await prisma.categories.findMany({})

    res.status(200).json(category)
}catch(err){
  res.status(500).json({message: err.message})
}
}

exports.getCategoryById = async (req, res) => {
const { id }= req.params
try{
    const category = await prisma.categories.findUnique({
        where: { id : parseInt(id)}
    })

    res.status(200).json(category)
}catch(err){
    res.status(500).json({message: err.message})
}
}

exports.updateCategorie = async (req, res) => {
    const { id} = req.params
    const { nom } = req.body

    try{
        const category = await prisma.categories.update({
            where : { id: parseInt(id)},
            data: { nom}
        })

        res.status(200).json({ message: "category updated successfully", nom: nom})
    }catch(err){
        res.status(400).json({ message: err.message})
    }

}

exports.deleteCategorie = async (req, res) => {
const {id} = req.params
try{
    await prisma.categories.delete({
        where: {id: parseInt(id)}
    })

    res.json({ message: "Delete category"})
}catch(err){
    res.status(404).json({ message: err.message })
}

}