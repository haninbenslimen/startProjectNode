const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({

    title: {
        type: String,
        enum: ['Horror', 'Mystery', 'Romance', 'Autre']
    }

})


module.exports = mongoose.model("category", categorySchema)