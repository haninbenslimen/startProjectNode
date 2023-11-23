const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role
            })
            user.save()
                .then((response) => {
                    const newUser = response.toPublic()
                    res.status(201).json({
                        user: newUser,
                        message: "user created"
                    })

                }).catch((error) => {
                    res.status(400).json({
                        error: error.message
                    })
                })
        }).catch((error) => res.status(500).json({ error: error.message }))
}


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Login ou mot de passe incorrect" });
            }
            //compare les 2 mots de passes avec bcrypt
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: "Login ou mot de passe incorrect" });
                    }
                    //création de token
                    const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                        expiresIn: "24h"
                    });

                    res.status(200).json({ token: token });
                })
                .catch((error) => res.status(500).json({ error: error.message }));
        })
        .catch((error) => res.status(500).json({ error: error.message }));
}