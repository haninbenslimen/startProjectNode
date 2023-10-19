const express = require("express")
const { default: mongoose } = require("mongoose")
const Task = require("./models/task")
const Book = require("./models/book")
const app = express()
mongoose
    .connect(
        "mongodb+srv://hanin:c1iTmvYZpkbDLQBU@cluster0.cpu80.mongodb.net/ProjetNode", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => console.log("Réussie"))
    .catch((e) => console.log("échouée!!", e))
    // app.use((req, res, next) => {
    //     console.log("requete reçue!")
    //     next()
    // })

// app.use((req, res, next) => {
//     res.status(201)
//     next()
// })



// app.use((req, res, next) => {
//     res.json({ message: "Votre requete a bien été reçue !" })
//     next()
// })

// app.use((req, res, next) => {
//     console.log("réponse envoyée avec succès !")
// })


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With, Content, Accept ,Content- Type, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET , POST , PUT, DELETE , PUTCH, OPTIONS"
    )
    next()
})

app.use(express.json()) //bech req.body mayjich feregh 

// app.get("/api/tasks/:id", (req, res) => {
//     console.log(req.params.id)
//     res.send(req.params.id)
// })

// app.post("/api/tasks/", (req, res) => {
//     console.log(req.body)
//     res.send(req.body)

// })

// app.put("/api/tasks/:id", (req, res) => {
//     console.log(req.body)
//     console.log(req.params.id)
//     res.send(req.body)
// })

// app.delete("/api/tasks/:id", (req, res) => {
//     console.log(req.params.id)
//     res.send(req.params.id)
// })

// app.get("/api/tasks", (req, res, next) => {
//     const todos = [{
//             _id: "1",
//             title: "learn js",
//             duration: "30",
//         }, {
//             _id: "2",
//             title: "learn node js",
//             duration: "40",
//         },
//         {
//             _id: "3",
//             title: "learn react",
//             duration: "60",
//         },
//     ]
//     res.status(200).json(todos)
// })

app.post("/api/tasks", (req, res) => {
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
})

app.get("/api/tasks/", (req, res) => {
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
})



app.patch("/api/tasks/:id", (req, res) => {
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
})


app.get("/api/tasks/:id", (req, res) => {
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
})

app.delete("/api/tasks/:id", (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: " Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error: error.message }))
})

app.post("/api/books", (req, res) => {
    const book = new Book(req.body)
    book.save().then(() => {
        res.status(201).json({
            model: book,
            message: "book created successfully !"
        })
    }).catch((error) => {
        res.status(400).json({
            error: error.message,
            message: "Invalid data"
        })
    })
})

app.get("/api/books", (req, res) => {
    Book.find().then((books) => {
        res.status(200).json({
            model: books,
            message: "success"
        })
    }).catch((error) => {
        res.status(400).json({
            error: error.message,
            message: "failed"
        })
    })
})


app.patch("/api/books/:id", (req, res) => {
    Book.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true })
        .then((book) => {
            if (!book) {
                res.status(400).json({
                    message: "Object not found !!"
                })
            } else {
                res.status(200).json({
                    model: book,
                    message: "object successfully found"
                })
            }
        }).catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "Problem extraction"
            })
        })
})

app.get("/api/books/:id", (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                res.status(400).json({
                    message: "Object not found !!"
                })
            } else {
                res.status(200).json({
                    model: book,
                    message: "Object successfully found"
                })
            }
        }).catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "problem extraction"
            })
        })
})

app.delete("/api/books/:id", (req, res) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "object deleted successfully" }))
        .catch((error) => res.status(400).json({ error: error.message }))
})

module.exports = app