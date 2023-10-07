import React, {useEffect, useState} from 'react';
import { FormControl, FormLabel, TextField, Button, Box } from '@mui/material'; // for designing
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios'; // for http requests

const MovieDetails = () => {

    const [inputs, setInputs] = useState({});

    // Geting the 'id' parameter from the URL using useParams hook
    const id = useParams().id;

    const history = useNavigate();

    // fetching movie data from the server when the component mounts
    useEffect( () => {
        const fetchHandler = async() => {
          // Fetch movie data by making a GET request to the server
            await axios.get(`http://localhost:5000/movies/${id}`)
            .then(res => res.data)
            .then(data => setInputs(data.movie));
        };
        fetchHandler()
    }, [id]);  // Triggering the effect when 'id' changes

    const sendRequest = async() => {
      await axios.put(`http://localhost:5000/movies/${id}`, {
        // Sending updated movie data in the request body
        title: String(inputs.title),
        director: String(inputs.director),
        description: String(inputs.description),
        genre: String(inputs.genre),
        releaseDate: inputs.releaseDate,
        image: String(inputs.image)
      }).then(res => res.data) // Handling the response
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      sendRequest().then( () => history("/movies")) // Sending the update request and navigate back to the movie list
    }

    const handleChange = (e) => {

      setInputs( (prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value // Update the 'inputs' state with the new field value
    }));

    }

    // Render the update movie form
  return( <div>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={400}
      margin="10px auto"
      padding={3}
      boxShadow={3}
      borderRadius={8}
      bgcolor="#ffffff"
    >
      <h3>Update a Movie</h3>
      { inputs && <form onSubmit={handleSubmit}>

        <FormControl fullWidth margin="normal">
          <FormLabel>Title</FormLabel>
          <TextField value={inputs.title} onChange={handleChange} variant="outlined" name="title" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>Director</FormLabel>
          <TextField value={inputs.director} onChange={handleChange} variant="outlined" name="director" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>Description</FormLabel>
          <TextField value={inputs.description} onChange={handleChange} variant="outlined" name="description" multiline rows={4} />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>Genre</FormLabel>
          <TextField value={inputs.genre} onChange={handleChange} variant="outlined" name="genre" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>Release Date</FormLabel>
          <TextField value={inputs.releaseDate} onChange={handleChange} variant="outlined" name="releaseDate" type="date" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>Image URL</FormLabel>
          <TextField value={inputs.image} onChange={handleChange} variant="outlined" name="image"/>
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: '1rem' }}
          type="submit"
        >
          Update Movie
        </Button>
        
      </form>}
    </Box>
  </div>)
}

export default MovieDetails