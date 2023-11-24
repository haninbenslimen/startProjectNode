const express = require("express")
const router = express.Router()
const taskController = require("../controllers/task")
const auth = require("../middlewares/auth")

/**
 * @swagger
 * tags:
 *      name: Tasks
 *      description: The Tasks managing API 
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     NewTask:
 *       type: object
 *       required:
 *         - title
 *         - duration
 *       properties:
 *         title:
 *           type: string
 *           description: The task title
 *         duration:
 *           type: string
 *           description: The task duration
 *         description:
 *           type: string
 *           description: The task description
 *       example:
 *         title: learn react
 *         duration: 130
 *         description: learn the fundamentals of react
 *     Task:
 *          allOf:
 *              - type: object
 *                properties:
 *                  _id:
 *                      type: string
 *                      description: The auto-generated id of the task
 *              - $ref: '#/components/schemas/NewTask'
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                  $ref: '#/components/schemas/NewTask'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                  $ref:'#/components/schemas/NewTask'
 *       400:
 *         description: Bad request. You may need to verify your information.
 *       500:
 *         description: Some server error
 *
 */



/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: get a task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                  ref:'#/components/schemas/Task'
 *       404:
 *         description: Object not found
 *       500:
 *         description: Some server error
 *
 */



/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: List all the tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              schema:
 *                  ref:'#/components/schemas/Task'
 *
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a new task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                  $ref: '#/components/schemas/NewTask'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/NewTask'
 *       400:
 *         description: Bad request. You may need to verify your information.
 *       500:
 *         description: Some server error
 *
 */

router.post("/", taskController.addTasks)
    //ici on faire l'appel de middleware 
    // router.post("/", auth.loggedMiddleware, auth.isAdmin, taskController.addTasks)

// router.get("/", auth.loggedMiddleware, taskController.fetchTasks)
router.get("/", taskController.fetchTasks)
router.patch("/:id", auth.loggedMiddleware, taskController.updateTasks)
    // router.get("/:id", auth.loggedMiddleware, taskController.getTasksById)
router.get("/:id", taskController.getTasksById)
router.delete("/:id", auth.loggedMiddleware, taskController.deleteTasks)



module.exports = router