const express = require("express")
const { default: mongoose } = require("mongoose")

const taskRoutes = require("./routes/task")
const bookRoutes = require("./routes/book")
const userRoutes = require("./routes/user")
const etudiantRoutes = require("./routes/etudiant")
const authorRoutes = require("./routes/author")
const categoryRoutes = require("./routes/category")
const testRoutes = require("./routes/test")
const eventRoutes = require("./routes/event")
const SwaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const app = express()
    //sur mongo local
mongoose.connect("mongodb://127.0.0.1:27017/startProjectNode", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Connection to MongoDB successful!"))
    .catch((e) => console.log("Connection to MongoDB failed :", e))
    //------------
    // mongoose
    //     .connect(
    //         "mongodb+srv://hanin:c1iTmvYZpkbDLQBU@cluster0.cpu80.mongodb.net/ProjetNode", {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true
    //         }
    //     ).then(() => console.log("Réussie"))
    //     .catch((e) => console.log("échouée!!", e))
    //------------

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

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todos Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application",
            contact: {
                name: "Hanine Ben Slimene",
                url: "",
                email: "haninebenslimene@gmail.com",
            },
        },
        servers: [{
            url: "http://localhost:5000/api",
            description: "Development server",
        }, ],
        components: {
            responses: {
                200: {
                    description: "Success",
                },
                400: {
                    description: "Bad request. You may need to verify your information.",
                },
                401: {
                    description: "Unauthorized request, you need additional privileges",
                },
                403: {
                    description: "Forbidden request, you must login first. See /auth/login",
                },
                404: {
                    description: "Object not found",
                },
                422: {
                    description: "Unprocessable entry error, the request is valid but the server refused to process it",
                },
                500: {
                    description: "Unexpected error, maybe try again later",
                },
            },

            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{
            bearerAuth: [],
        }, ],
    },
    apis: ["./routes/*.js"], //win bech yal9a le reste de doc 
}




app.use("/api/tasks", taskRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/etudiants", etudiantRoutes)
app.use("/api/authors", authorRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/tests", testRoutes)
app.use("/api/events", eventRoutes)


const specs = swaggerJSDoc(options)
app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    )
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