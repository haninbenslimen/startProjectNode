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
        .populate('author') //le champ author in schema book c'est pas le nom de model
        .populate('categories') //le champ categories in schema book 
        .then((book) => {
            if (!book) {
                res.status(404).json({
                    message: "Objet non trouvé",
                })
            } else {
                //-- -- -  exple to use Uppercase 
                // const uppercaseAuthor = book.author ? book.author.name.toUpperCase() : null
                //----------

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



// this method with async await


// const getBooksById = async(req, res) => {
//     try {
//         const book = await Book.findOne({ _id: req.params.id })
//             .populate('author') // le champ author in schema book n'est pas le nom du model
//             .populate('categories'); // le champ categories in schema book 

//         if (!book) {
//             res.status(404).json({
//                 message: "Objet non trouvé",
//             });
//         } else {
//             res.status(200).json({
//                 model: book,
//                 message: "Objet trouvé",
//             });
//         }
//     } catch (error) {
//         res.status(400).json({
//             error: error.message,
//             message: "problème d'extraction",
//         });
//     }
// };


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


const findBooksByAuthor = async(req, res) => {
    try {
        const authorId = req.params.id
            //ici on faire l'appel de la méthode statique findByAuthor
        const books = await Book.findByAuthor(authorId)
        res.status(200).json(books)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erreur lors de la recherche des livres par auteur' })
    }
}



// Contrôleur pour la création de livre
const createBook = async(req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: 'Livre créé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du livre.' });
    }
};


module.exports = {
    createBook,
    findBooksByAuthor,
    addBooks,
    //addBooks = addBooks meme chose 
    fetchBooks,
    getBooksById,
    updateBooks,
    deleteBooks
}