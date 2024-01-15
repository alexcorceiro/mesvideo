const express  = require("express");
const router = express.Router();
const UserRouter = require("./userRouter")
const VideoRouter = require("./videoRoute")
const studioRouter = require("./studioRoute")
const categorieRouter = require("./categorieRoute")
const tagRouter = require("./tagRoute")



router.use("/users", UserRouter)
router.use("/video", VideoRouter)
router.use("/studio", studioRouter)
router.use("/categorie", categorieRouter)
router.use("/tag", tagRouter)





module.exports = router