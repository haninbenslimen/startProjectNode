const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")
const validation = require("../middlewares/validation")

router.post("/signup", validation.validateSignup, userController.signup)

router.post("/login", userController.login)


module.exports = router