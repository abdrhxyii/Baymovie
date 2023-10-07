import React, {useState} from 'react';
import { FormControl, FormLabel, TextField, Button, Box } from '@mui/material'; // importing for material ui
import axios from 'axios'; // for http requests
import { useNavigate } from 'react-router-dom'; // for navigation

// Define the AddMovie component
const AddMovie = () => {
    const history = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        director: "",
        description: "",
        genre: "",
        releaseDate: "",
        image: ""
    });

    // Function to handle input changes
    const handleChange = (e) => {
        setInputs( (prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // Function to send an HTTP POST request to add a new movie
    const sendRequest = async() => {
        await axios.post("http://localhost:5000/movies", {
          
            title: String(inputs.title),
            director: String(inputs.director),
            description: String(inputs.description),
            genre: String(inputs.genre),
            releaseDate: inputs.releaseDate,
            image: String(inputs.image)

        }).then( res => res.data);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs)
        sendRequest().then( () => history('/movies')) // Redirect to the movies page after adding a new movie
    }

    // below are addd movie form design, this will render for adding movies
  return (
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
      <h3>Add a New Movie</h3>
      <form onSubmit={handleSubmit}>

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
          Add Movie
        </Button>
        
      </form>
    </Box>
  )
}

export default AddMovie