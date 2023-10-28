const Task = require("../models/task")

const addTasks = (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).json({
            model: task,
            message: "Objet créé !"
        })
    }).catch((error) => {
        res.status(400).json({
            error: error.message,
            message: "Données invalides",
        })
    })
}

const fetchTasks = (req, res) => {
    Task.find()
        .then((tasks) => {
            res.status(200).json({
                model: tasks,
                message: "success"
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "problème 'extraction",
            })
        })
}

const getTasksById = (req, res) => {
    Task.findOne({ _id: req.params.id })
        .then((task) => {
            if (!task) {
                res.status(404).json({
                    message: "Objet non trouvé",
                })
            } else {
                res.status(200).json({
                    model: task,
                    message: "Objet trouvé",
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "problem 'extraction",
            })
        })
}


const updateTasks = (req, res) => {
    Task.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true })
        .then((task) => {
            if (!task) {
                res.status(404).json({
                    message: "Objet non trouvé",
                })
            } else {
                res.status(200).json({
                    model: task,
                    message: "Objet modifié",
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "problème 'extraction",
            })
        })
}


const deleteTasks = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: " Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error: error.message }))
}

module.exports = {
    addTasks,
    //addTasks = addTasks meme chose 
    fetchTasks,
    getTasksById,
    updateTasks,
    deleteTasks
}