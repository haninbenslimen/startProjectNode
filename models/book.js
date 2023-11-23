const mongoose = require("mongoose")
const idValidator = require('mongoose-id-validator')

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    // author: { type: String, required: true },
    genre: String,
    published: { type: Number, required: true },
    description: String,

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author' //n3ayetlo fel controller 
    },

    //snn book:[{}] ds  catégorie 

    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }]
})
bookSchema.statics.findByAuthor = async function(authorId) {
        return this.find({ author: authorId });
    }
    // Utiliser mongoose-id-validator pour valider la relation entre livre et auteur
bookSchema.plugin(idValidator)
module.exports = mongoose.model("Book", bookSchema)