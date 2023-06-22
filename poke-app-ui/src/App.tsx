import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';
import PokemonForm from './components/PokemonForm';
import PokemonList from './components/PokemonList';

function App() {

  const [pokemons, setPokemons] = useState([{ id: 0, name: "", type: "", move: "" }]);

  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/pokemon")
      .then(response => {
        console.log(response)
        setPokemons(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, [setPokemons])

  return (
    <div className="App">
      <Header />
      <hr />
      <PokemonForm pokemons={pokemons} setPokemons={setPokemons} searchString={searchString} />
      <hr />
      <PokemonList pokemons={pokemons} setPokemons={setPokemons} searchString={searchString} setSearchString={setSearchString} />
    </div>
  );
}

export default App;
