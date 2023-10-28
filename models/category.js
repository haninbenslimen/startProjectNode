const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },

    title: {
        type: String,
        enum: ['Horror', 'Mystery', 'Romance', 'Autre']
    }

})


module.exports = mongoose.model("Category", categorySchema)