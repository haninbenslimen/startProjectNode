const Author = require("../models/author")

exports.addAuthor = (req, res) => {
    const author = new Author(req.body)
    author.save()
        .then(() => {
            res.status(201).json({
                //----------test Virtuall fullName --------------
                // model: author.nationality + ' ' + author.fullName,
                model: author,
                message: "created"
            })
        }).catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "not created!!"
            })

        })
}