import React from 'react';
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom'; // link for navigatuon purpose
import { useSelector } from 'react-redux'; // access redux state
import { authActions } from '../store'; // Importing Redux action creators from the 'authActions' module
import { useDispatch } from 'react-redux'; // Importing 'useDispatch' hook for dispatching Redux actions

const Header = () => {
    const dispatch = useDispatch(); // for redux actions

    // Access the 'isLoggedIn' state from Redux store
    const isLoggedIn = useSelector(state=> state.isLoggedIn);

    return ( 
    <AppBar position="sticky" sx={{ background: "#1d1160" }}>
      <Toolbar>
        <Typography variant="h5">Movies App</Typography>

        <Box flexGrow={1} />

        {isLoggedIn ? (
          <Tabs value={false}>
            {/* Navigation tabs for authenticated users */}
            <Tab
              component={Link}
              to="/movies"
              label="All Movies"
              sx={{ color: 'white' }}
            />
            <Tab
              component={Link}
              to="/myMovies/add"
              label="Add Movies"
              sx={{ color: 'white' }}
            />
          </Tabs>
        ) : ( // Rendering for non-authenticated users
          <Box>
             {/* Login and Signup buttons for non-authenticated users */}
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              sx={{ marginX: 1, borderRadius: 10 }}
              color="warning"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              sx={{ marginX: 1, borderRadius: 10 }}
              color="warning"
            >
              Signup
            </Button>
          </Box>
        )}

        {isLoggedIn && ( // Dispatch the 'logout' action when clicked
          <Button
            onClick={() => dispatch(authActions.logout())}
            component={Link}
            to="/auth"
            variant="contained"
            sx={{ marginX: 1, borderRadius: 10 }}
            color="warning"
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
    )
}

export default Header;