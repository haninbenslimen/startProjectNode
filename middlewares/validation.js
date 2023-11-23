const Joi = require('joi')

// Middleware de validation pour la route /signup
exports.validateSignup = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().password().required(),
        lastName: Joi.string().lastName().required(),
        firstName: Joi.string().firstName().required(),

    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    next()

}


// Middleware de validation pour la route de création de livre
exports.validateBookCreation = async(req, res, next) => {
    try {

        // Vérifier si l'auteur a des anciens livres
        const authorId = req.body.author;
        const existingBooks = await Book.findByAuthor(authorId) // Utilisez la méthode findByAuthor ici
        if (existingBooks.length === 0) {
            return res.status(400).json({ error: 'L\'auteur doit avoir écrit d\'autres livres avant de créer celui-ci.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la validation du livre.' });
    }
}