const express = require("express")
const { default: mongoose } = require("mongoose")
const taskRoutes = require("./routes/task")
const bookRoutes = require("./routes/book")
const userRoutes = require("./routes/user")
const etudiantRoutes = require("./routes/etudiant")
const authorRoutes = require("./routes/author")


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


app.use("/api/tasks", taskRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/etudiants", etudiantRoutes)
app.use("/api/authors", authorRoutes)
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


module.exports = app