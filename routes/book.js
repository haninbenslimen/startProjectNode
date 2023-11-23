const express = require("express")
const router = express.Router()
const bookController = require("../controllers/book")


router.post("/", bookController.addBooks)

router.get("/", bookController.fetchBooks)



router.patch("/:id", bookController.updateBooks)


router.get("/:id", bookController.getBooksById)
router.get("/:id", bookController.getBooksById)
router.get('/author/:id', bookController.findBooksByAuthor);

router.delete("/:id", bookController.deleteBooks)


module.exports = router