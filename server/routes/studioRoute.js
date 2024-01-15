const express  = require('express');
const {getAllStudio, getStudioById, updateStudio, deleteStudio, createStudio } = require('../controller/studioController');
const { uploadImageMiddleware } = require('../utils/uplaodImage');
const router = express.Router();


router.post("/", uploadImageMiddleware, createStudio)
router.get("/", getAllStudio)
router.get("/:id", getStudioById)
router.put("/:id", uploadImageMiddleware, updateStudio)
router.delete("/:id", deleteStudio);






module.exports = router