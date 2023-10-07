// Importing mongoose library to work with the MongoDB Database
const mongoose = require('mongoose');

// Defining a schema for the Movie model
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    // Defining the title field with String type and making it required
    title: {
        type: String,
        required: true
    }, 

     // Defining the director field with String type and making it required
    director: {
        type: String,
        required: true
    },

    // Defining the description field with String type and making it required
    description: {
        type: String,
        required: true
    },

    // Defining the genre field with String type and making it required
    genre: {
        type: String,
        required: true
    },

    // Defining the releaseDate field with Date type and making it required
    releaseDate: {
        type: Date,
        required: true
    },

    // Defining the image field with String type and making it required
    image: {
        type: String,
        required: true
    },
});

// Creating a Mongoose model named "Movie" based on the movieSchema
module.exports = mongoose.model("Movie", movieSchema)

