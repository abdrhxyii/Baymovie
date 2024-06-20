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
      <Header/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Auth/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/movies/:id" element={<MovieDetails/>}/>
          <Route path="/myMovies/add" element={<AddMovie/>}/>
        </Routes>
      </main>
    </React.Fragment>
  )
}

export default App;
