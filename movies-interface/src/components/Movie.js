import { Button } from '@mui/material';
import React from 'react';
import './Movie.css';
import { Link, useNavigate } from 'react-router-dom'; // routing related hook
import axios from 'axios'; // Importing Axios for HTTP requests

const Movie = (props) => {

    const history = useNavigate()

    // Destructure movie data from the 'props' object
    const {_id, title, director, description, genre, releaseDate, image} = props.movie;

    // sending delete request to the server
    const deleteRequest = async() => {
        const res = await axios
        .delete(`http://localhost:5000/movies/${_id}`)

        .catch( (err) => console.log(err)); // logging erorr foe debugging purpose
        const data = await res.data;
        return data;
    };

    // Defining a function to handle the delete button click
    const deleteHandler = () => {
        deleteRequest()
        .then( () => history("/"))
        .then( () => history("/movies"))
    }
    
    // formating the date format for more readability
    const formattedDate = new Date(releaseDate).toISOString().substring(0, 10);

    return <div className="image-background"> 
        <img src={image} alt={title} className='movie-img'/>
        <h3>{title}</h3>
        <p>Director: {director}</p>
        <p>Description: {description}</p>
        <p>Genre: {genre}</p>
        <p>Release Date: {formattedDate}</p>

        <Button component={Link} to={`/movies/${_id}`} >Update</Button>
        <Button onClick={deleteHandler}>Delete</Button>
    </div>
}

export default Movie;