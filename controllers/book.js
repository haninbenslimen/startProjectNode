const Book = require("../models/book")
const Author = require("../models/author")
const Category = require("../models/category")

const addBooks = (req, res) => {
    const book = new Book(req.body)
    book.save().then(() => {
        res.status(201).json({
            model: book,
            message: "Objet créé !"
        })
    }).catch((error) => {
        res.status(400).json({
            error: error.message,
            message: "Données invalides",
        })
    })
}

const fetchBooks = (req, res) => {
    Book.find()
        .then((books) => {
            res.status(200).json({
                model: books,
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

const getBooksById = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .populate('author')
        .populate('categories')
        .then((book) => {
            if (!book) {
                res.status(404).json({
                    message: "Objet non trouvé",
                })
            } else {
                res.status(200).json({
                    model: book,
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


const updateBooks = (req, res) => {
    Book.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true })
        .then((book) => {
            if (!book) {
                res.status(404).json({
                    message: "Objet non trouvé",
                })
            } else {
                res.status(200).json({
                    model: book,
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


const deleteBooks = (req, res) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: " Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error: error.message }))
}

module.exports = {
    addBooks,
    //addBooks = addBooks meme chose 
    fetchBooks,
    getBooksById,
    updateBooks,
    deleteBooks
}