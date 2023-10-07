import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import AddMovie from './components/AddMovie';
import { useSelector } from 'react-redux'; // React-reducs hooks

function App() {
  
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn); 

  return (
    <React.Fragment>

      <header>
        {/* Navbar  */}
      <Header/>
      </header>

      <main>
         {/* Define routes for different pages using React Router */}
        <Routes>
          
          {/* Route for the authentication page */}
          <Route path="/auth" element={<Auth/>}/>

          {/* Route for the movies page */}
          <Route path="/movies" element={<Movies/>}/>

          {/* Route for movie details page with dynamic ID where Update & Delete will be done */}
          <Route path="/movies/:id" element={<MovieDetails/>}/>

          {/* Route for adding a new movie */}
          <Route path="/myMovies/add" element={<AddMovie/>}/>

        </Routes>
      </main>

    </React.Fragment>
  )
}

export default App;
