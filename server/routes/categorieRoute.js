const express = require("express")
const { createCategorie, getAllCategorie, getCategoryById, updateCategorie, deleteCategorie } = require("../controller/categorieController")
const router = express.Router()

router.post("/", createCategorie)
router.get("/", getAllCategorie)
router.get("/:id", getCategoryById)
router.put("/:id", updateCategorie)
router.delete("/:id", deleteCategorie)


module.exports = router