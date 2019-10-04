const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('../config/config');
let Schema = mongoose.Schema;


let userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator, {message: "Error, ya existe en la base de datos el email '{VALUE}'"});

module.exports = mongoose.model("User", userSchema);