const express = require("express");
const { login, register, getProfile, getProfileById, updateProfile, updateProfileById, deleteUser, getAllProfiles } = require("../controller/UserController");
const { authenticate } = require("../middleware/auth");
const router = express.Router();


router.post("/", login)
router.post("/register", register)
router.get("/profile", authenticate, getProfile)
router.get("/:id", getProfileById)
router.get("/", getAllProfiles)
router.put("/updateprofile", authenticate, updateProfile)
router.put("/:id", updateProfileById)
router.delete(":id", deleteUser)

module.exports = router