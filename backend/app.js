require('dotenv').config()
const express = require('express');
const cors = require('cors'); // importing cors to send req from backend to frontend
const moviesRouter  = require("./routes/movies-routes");
const userRouter = require('./routes/user-routes');
const mongoose = require('mongoose');

// Create an instance of the Express application
const app = express();

// middlewares
app.use(cors()); // sending req from one server to different server 
app.use(express.json()); // Parsing incoming JSON data

app.use('/user', userRouter); // Using the userRouter for routes under '/user' path
app.use('/movies', moviesRouter ); // Using the moviesRouter for routes under '/movies' path

// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });

mongoose.connect(process.env.CONNECTION_STRING)

.then(() => console.log("Connected to Database")) // indicating successful database connection

.then(() => {
    // Start the Express application and listen on port 5000
    app.listen(5000);
})

.catch((err) => console.log(err)); // Logs any errors that occur during the connection

// RnGj0FHQWVFA11cp ( MongoDB Password )

module.exports = app