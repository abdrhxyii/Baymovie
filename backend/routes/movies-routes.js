// Importing the Express framework and create a router instance
const express = require('express');
const router = express.Router();

// Import the Movie model and movies controller
const Movie = require('../model/Movie');
const moviesController = require("../controllers/movies-controller");

// Defining routes for movie-related operations using moviesController functions

router.get("/", moviesController.getAllMovies);
router.post("/", moviesController.addMovie); // Add a new movie
router.get("/:id", moviesController.getByID); // Get a movie by ID
router.put("/:id", moviesController.updateMovie); // Update a movie by ID
router.delete("/:id", moviesController.deleteMovie); // Delete a movie by ID

// Exportung the router
module.exports = router;