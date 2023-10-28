const jwt = require("jsonwebtoken")
const User = require("../models/user")

module.exports.loggedMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
        const userId = decodedToken.userId


        User.findOne({ _id: userId })
            .then((response) => {
                if (response) {
                    req.auth = { //on met les val ici pr utiliser on isAdmin , req.ayesem 
                        userId: userId,
                        role: response.role
                    }
                    next()
                } else {
                    res.status(401).json({
                        error: "user doesn't exist "
                    }).catch((error) => {
                        res.status(500).json({ error: error.message })
                    })
                }
            })



        // next() ici ken khalineha yet3ada leli ba3do men ghir ma y'exécuter ya3ni après then  yestana just response tji wya3mlch traitement hetheka 

    } catch (error) { res.status(401).json({ error }) }

}
module.exports.isAdmin = (req, res, next) => {
    try {
        if (req.auth.role === "admin") {
            next() //yokhrej yet3ada controller eli ba3edo wela  haja selon nidham mte3i 
        } else {
            res.status(403).json({ error: "no access to this route " })
        }
    } catch (e) {
        res.status(401).json({ error: error.message })
    }
}