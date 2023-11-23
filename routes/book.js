const express = require("express")
const router = express.Router()
const bookController = require("../controllers/book")
const validation = require("../middlewares/validation")


// router.post("/", bookController.addBooks)
router.post("/", validation.validateBookCreation, bookController.createBook);

router.get("/", bookController.fetchBooks)



router.patch("/:id", bookController.updateBooks)


router.get("/:id", bookController.getBooksById)
router.get("/:id", bookController.getBooksById)
router.get('/author/:id', bookController.findBooksByAuthor);

router.delete("/:id", bookController.deleteBooks)


module.exports = router