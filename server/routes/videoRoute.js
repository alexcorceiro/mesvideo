const express = require('express');
const { createVideo, getAllVideo, getVideoById, updateVideo, deleteVideo } = require('../controller/videosController');
const  uplaodVideomid  = require('../middleware/video');
const { generatetedUrl } = require('../utils/uplaodvideo');
const router = express.Router();


router.post("/",uplaodVideomid, createVideo)
router.get("/", getAllVideo)
router.get("/:id", getVideoById)
router.put("/:id",uplaodVideomid, updateVideo)
router.delete("/:id", deleteVideo)





module.exports = router