const express = require('express');
const router = express.Router();
const moviesController = require("../controllers/movies-controller");
const multer = require('multer');

const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

router.get("/", moviesController.getAllMovies);
router.post("/", upload.single('image'), moviesController.addMovie); // Add a new movie
router.get("/:id", moviesController.getByID); // Get a movie by ID
router.put("/:id", moviesController.updateMovie); // Update a movie by ID
router.delete("/:id", moviesController.deleteMovie); // Delete a movie by ID

module.exports = router;