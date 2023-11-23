const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');

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
    }, { timestamps: true }, {
        virtuals: {
            name: {
                get() {
                    return this.firstName + ' ' + this.lastName
                }

            }

        }
    })
    //Cette option indique à Mongoose d'inclure les champs virtuels lors de la conversion d'un document en format JSON à l'aide de la méthode toJSON(). Les champs virtuels sont des champs calculés à partir des autres champs du document, mais ils ne sont pas stockés dans la base de données. 
userSchema.set('toJSON', { virtuals: true })
    //lorqu'on utilise toObject
userSchema.set('toObject', { virtuals: true })

userSchema.methods.toPublic = function() {
        const user = this.toObject()
        delete user.password
        return user
    }
    // Utiliser mongoose-unique-validator pour valider l'email
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model("User", userSchema)