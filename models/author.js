const mongoose = require("mongoose")
const authorSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    nationality: { type: String, required: true },

}, {
    virtuals: {
        fullName: {
            get() {
                return this.firstName + ' ' + this.lastName
            }

        }

    }
})

module.exports = mongoose.model("author", authorSchema)