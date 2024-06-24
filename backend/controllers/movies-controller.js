// Importing movie model 
const Movie = require('../model/Movie');
// const 



// Function to get all the movies from the database
const getAllMovies = async(req, res, next) => {

  let movies;
  try {

    // Using the Movie model to find all movies in the database
    movies = await Movie.find();

  } catch (err) {
    console.log(err);
  }

  // Validations
  // If movies are not found , return 404 status code 
  if (!movies) {
    return res.status(404).json({message: "No movies found"})
  }
  // If movies are found, return 200 status code with all the movies 
  return res.status(200).json({movies})
};

// Function to get a movie by its ID from the database
const getByID = async (req, res, next) => {
    const id = req.params.id;
    let movie;

    try{
        // Using the Movie model to find a movie by its ID in the database
        movie = await Movie.findById(id);

    } catch (err) {
        console.log(err);
    }

    // Validations
    if (!movie) {
        // If no movie is found, return a 500 response
        return res.status(500).json({message: "No Movie Found"});
    }

    // If a movie is found, return a 201 response with the movie data
    return res.status(201).json({movie});
}

// Function to add a new movie to the database
const addMovie = async (req, res, next) => {
    const {title, director, description, genre, releaseDate, image} = req.body;
    let movie;

    try{
        // Create a new Movie document and save it to the database
        movie = new Movie({
            title,
            director,
            description,
            genre,
            releaseDate,
            image
        });
        await movie.save(); // save the data in the database

    } catch (err){
        console.log(err);
    }

    // Validations
    // If the movie is not recorded successfully, return a 500 status code response ( Indicating the function is unsuccessfull)
    if (!movie) {
        return res.status(500).json({message: "Unable to add"});
    }

     // If the movie is recorded successfully, return a 201 status code response with the movie data (Indicating the function is successfull)
    return res.status(201).json({movie});
}

// Function to update an existing movie in the database
const updateMovie = async (req, res, next) => {
    const id = req.params.id;
    const {title, director, description, genre, releaseDate, image} = req.body;
    let movie;

    try{
        // Find the movie by its ID and update its properties
        movie = await Movie.findByIdAndUpdate(id, {
            title,
            director,
            description,
            genre,
            releaseDate,
            image
        });

        movie = await movie.save()

    } catch (err) {
        console.log(err);
    }

    // Validations
    // If the movie is not updated successfully, return a 404 respons
    if (!movie) {
        return res.status(404).json({message: "Unable to update by this ID"});
    }

    // // If the movie is updated successfully, return a 200 response with the updated movie data
    return res.status(200).json({movie});

}

// Function delete the existing movies from the database by the ID
const deleteMovie = async (req, res, next) => {
    const id = req.params.id;
    let movie;

    try {
         // Find the movie by its ID and remove it from the database
        movie = await Movie.findByIdAndRemove(id);
    }
    catch (err) {
        console.log(err);
    }

    // Validations
    // If the movie is not deleted successfully, return a 404 response
    if (!movie) {
        return res.status(404).json({message: "Unable to delete by this ID"});
    }

    // If the movie is deleted successfully, return a 200 response with a success message
    return res.status(200).json({message: "Movie successfully deleted"});

}

// exporting the functions (CRUD Operations)
module.exports = {
    getAllMovies,
    addMovie,
    getByID,
    updateMovie,
    deleteMovie,
}