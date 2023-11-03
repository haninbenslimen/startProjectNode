const mongoose = require("mongoose")

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

module.exports = mongoose.model("Book", bookSchema)