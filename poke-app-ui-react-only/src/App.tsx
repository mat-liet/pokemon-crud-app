import React from 'react';
import './App.css';
import Header from './components/Header';
import PokemonForm from './components/PokemonForm';
import PokemonList from './components/PokemonList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter basename='/'>
      <Header />
      <Routes>
        <Route path='/' element={<PokemonForm/>}></Route>
        <Route path='/list' element={<PokemonList/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
