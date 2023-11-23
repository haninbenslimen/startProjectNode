const mongoose = require("mongoose")
const testSchema = mongoose.Schema({
    cin: { type: String, unique: true, trim: true, },
    name: { type: String, required: true, trim: true, },
    numero: Number,
    comments: [{ body: String, date: Date }],
    age: { type: Number, min: 18, max: 90 },
    updated: { type: Date, default: Date.now },
    date: {
        type: Date,
        default: Date.now()
    },
    actif: Boolean,

}, {
    statics: {
        findByActif(actif) {
            return this.find({ actif: new RegExp(actif, true) })
        }
    }
})

module.exports = mongoose.model("Test", testSchema)