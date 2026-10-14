const express = require("express");
const {registerUser,loginUser, logoutUser,getmeController} = require('../controllers/auth.controller')
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();


router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/get-me",authMiddleware.authUser, getmeController)

module.exports = router;