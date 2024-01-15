const express = require("express")
const { createTag, getAllTag, getTagById, updateTag, deleteTag } = require("../controller/tagConttroller")
const router = express.Router()



router.post("/", createTag)
router.get("/", getAllTag)
router.get("/:id", getTagById)
router.put("/:id", updateTag)
router.delete("/:id", deleteTag)


module.exports = router