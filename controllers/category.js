const Category = require("../models/category")

exports.addCategory = (req, res) => {
    const category = new Category(req.body)
    category.save()
        .then(() => {
            res.status(201).json({
                model: category,
                message: "created"
            })
        }).catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "not created!!"
            })

        })
}