// Importing mongoose library to work with the MongoDB Database
const mongoose = require('mongoose');

// Defining a schema for the Movie model
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    // Defining the email field with String type, make it required, and enforce uniqueness
    // Because, there csn be only one user address
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Defining the password field with String type, make it required, and set a minimum length of 6 characters
    password: {
        type: String,
        required: true,
        minlength: 6
    },

});

// Creating a Mongoose model named "User" based on the userSchema
module.exports = mongoose.model("User", userSchema);