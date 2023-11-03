const express = require("express")
const router = express.Router()
const taskController = require("../controllers/task")
const auth = require("../middlewares/auth")


//ici on faire l'appel de middleware 

router.post("/", auth.loggedMiddleware, auth.isAdmin, taskController.addTasks)

router.get("/", auth.loggedMiddleware, taskController.fetchTasks)



router.patch("/:id", auth.loggedMiddleware, taskController.updateTasks)


router.get("/:id", auth.loggedMiddleware, taskController.getTasksById)

router.delete("/:id", auth.loggedMiddleware, taskController.deleteTasks)



module.exports = router