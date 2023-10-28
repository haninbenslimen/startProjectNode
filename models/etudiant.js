const mongoose = require("mongoose")
const etudiantSchema = mongoose.Schema({
    name: String,
    age: Number
})
module.exports = mongoose.model("Etudiant", etudiantSchema)