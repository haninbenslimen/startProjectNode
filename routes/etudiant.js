const express = require("express")
const router = express.Router()
const etudiantController = require("../controllers/etudiant")



router.post("/", etudiantController.addEtudiant)

router.get("/", etudiantController.getAllEtduiants)

router.patch("/:id", etudiantController.updateEtudiant)
router.get("/:id", etudiantController.getEtudiantById)

router.delete("/:id", etudiantController.deleteEtudiant)


module.exports = router