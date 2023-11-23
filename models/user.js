const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "admin"
    }
}, {
    virtuals: {
        name: {
            get() {
                return this.firstName + ' ' + this.lastName
            }

        }

    }
})

userSchema.methods.toPublic = function() {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)