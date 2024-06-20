import React, {useEffect, useState} from 'react'
import Movie from './Movie';
import axios from 'axios';
import "./Movie.css";

// Defining the URL for fetching movie data from a local server
const URL = "http://localhost:5000/movies";

// Defining an asynchronous function to fetch movie data from the server
const fetchHandler = async () => {
    // Using axios to make a GET request to the specified URL
    // and returning the data received from the server
    return await axios.get(URL).then((res) => res.data);
};

const Movies = () => {

    const [movies, setMovies] = useState();

    useEffect ( () => {

        // Calling the 'fetchHandler' function to get movie data
        fetchHandler().then((data) => setMovies(data.movies));
    }, []);

    // Logging the 'movies' state to the console (for debugging purposes)
    console.log(movies);

    return (
        <div className='movie-container'>
          {movies && (
            <div className='movie-grid'>
              {movies.map((movie, i) => (
                <div className='movie' key={i}>
                  <Movie movie={movie} />
                </div>
              ))}
            </div>
          )}
        </div>
      );

};

export default Movies