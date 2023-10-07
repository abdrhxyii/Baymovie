import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Container, Snackbar } from '@mui/material'; // matrial UI
import MuiAlert from '@mui/material/Alert'; // for message/alert 
import axios from 'axios'; // for http request
import { authActions } from '../store'; // Importing Redux action creators from the 'authActions' module (store -> index.js)
import { useNavigate } from 'react-router-dom';  // Importing the 'useNavigate' hook for programmatic navigation
import { useDispatch } from 'react-redux'; // Importing 'useDispatch' hook for dispatching Redux actions

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [isSignup, setIsSignup] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false); // state for visibility of snackbar message
  const [snackbarMessage, setSnackbarMessage] = useState(''); // state for snakbar message

  // Function to handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

    // Function to send an HTTP request for login or signup
  const sendRequest = async (type = 'login') => {
    try {
      const res = await axios.post(`http://localhost:5000/user/${type}`, {
        email: inputs.email,
        password: inputs.password,
      });

      const data = res.data;
      return data;

    } catch (err) {
      // Handle errors and display them in a Snackbar (in a collored message box)
      setSnackbarMessage(err.response.data.message);
      setSnackbarOpen(true);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbarOpen(false);

    try {
      if (isSignup) {
        // If in signup mode, send a signup request
        await sendRequest('signup');
        // After signing up, redirect to the login page
        setIsSignup(false);
        setSnackbarMessage('Signup successful. Please login.'); // Informing the user
        setSnackbarOpen(true);

      } else {
        // If in login mode, send a login request
        await sendRequest();
        // After successful login, redirect to the movies page
        dispatch(authActions.login());
        navigate('/movies');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadius={5}
        bgcolor="background.paper"
      >
        <Typography variant="h4" gutterBottom>
          {isSignup ? 'Sign Up' : 'Login'}
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                onChange={handleChange}
                type="email"
                value={inputs.email}
                label="Email Address"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                onChange={handleChange}
                value={inputs.password}
                type="password"
                label="Password"
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* toggling Submit button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ borderRadius: 3, mt: 2 }}
            color="primary"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </form>

        {/* Toggling between login and signup mode */}
        <Button onClick={() => setIsSignup(!isSignup)} sx={{ mt: 2 }}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Button>
      </Box>

      {/* Snackbar for displaying error messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Auth;
