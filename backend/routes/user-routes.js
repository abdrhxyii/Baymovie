// Importing the Express framework and create a router instance
const express = require('express');
const router = express.Router();

// Importing the User model and user controller
const User = require('../model/User');
const {getAllUser, signUp, login} = require("../controllers/user-controller");

// Defining routes for user-related operations using user controller functions
router.get('/', getAllUser);
router.post('/signup', signUp);  // User sign-up
router.post('/login', login); // User login

// Exporting the router
module.exports = router;

