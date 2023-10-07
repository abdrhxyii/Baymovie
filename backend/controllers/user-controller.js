// Importing User Model 
const User = require('../model/User');
// Importing bcrypt from password hasshing algorithm
const bcrypt = require('bcryptjs');

// Function to get all users from the database
const getAllUser = async (req, res, next) => {
    let users;
    try{
        // Using the User model to find all users in the database
        users = await User.find();
    } 
    catch (err){
        console.log(err);
    }

     // If no users are found, return a 404 response
    if (!users) {
        return res.status(404).json({message: "No Users Found"});
    }

    // If users are found, return a 200 response with the list of users
    return res.status(200).json({users})
}

// Function for user registration (sign-up)
const signUp = async(req, res, next) => {
    const {email, password} = req.body;
    let userExist;

    try {
        // Checking if a user with the same email already exists in the database
        userExist = await User.findOne({email});

    } catch (err) {
        return console.log(err);
    }

    // If a user with the same email exists, return 400 response
    if (userExist) {
        return res
            .status(400)
            .json({message: "User Already Exist"})
    }
    // Hashing the user's password using bcrypt
    const hasshedPassword = bcrypt.hashSync(password);
    
    const user = new User({
        email, 
        password: hasshedPassword,
    });

    try {
        // Saving the new user document in the database
        await user.save()
    } 
    catch (err) {
        return console.log(err);
    }

    // If the user is successfully registered, return a 201 response with the user data
    return res.status(201).json({user})
};

// Function for user login ( User must be first signed for the successfull login)
const login = async (req,res,next) => {
    const {email, password} = req.body;
    let userExist;
    try {
        // Finding the user by their email in the database
        userExist = await User.findOne({email});

    } catch (err) {
        return console.log(err);
    }

    // If no user with the given email is found, return a 404 response
    if (!userExist) {
        return res
            .status(404)
            .json({message: "Couldn't find the user"})
    }

    // Comparing the provided password with the hashed password stored in the database
    const isPasswordMatch = bcrypt.compareSync(password, userExist.password);

    // If passwords don't match, return a 400 response
    if (!isPasswordMatch) {
        return res.status(400).json({message:"Incorrect Password"})
    }

    // If login is successful, return a 200 response
    return res.status(200).json({message:"Login Successfull"})
}

// Exporting all the user authentication fuctions
module.exports = {
    login,
    getAllUser,
    signUp,
};

