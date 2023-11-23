const express = require("express")
const router = express.Router()
const testController = require("../controllers/test")
const auth = require("../middlewares/auth")


router.post("/", auth.loggedMiddleware, auth.isAdmin, testController.addTest)
router.get("/", auth.loggedMiddleware, auth.isUser, testController.fetchTests)
router.get("/:id", testController.getTestsById)
router.patch("/:id", testController.updateTests)
router.delete("/:id", testController.deleteTests)
    // router.get("/actifTests", testController.fetchActifTests)

module.exports = router