import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';
import PokemonForm from './components/PokemonForm';
import PokemonList from './components/PokemonList';

function App() {

  const [pokemons, setPokemons] = useState([{ id: 0, name: "", type: "", move: "" }]);

  const [searchString, setSearchString] = useState("");

  const [sortField, setSortField] = useState("nameAsc");

  const [addedPokemon, setAddedPokemon] = useState(false);

  const [deletedPokemon, setDeletedPokemon] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8000/api/pokemon", { params: { filter_name: searchString, page: page, sort_field: sortField } })
      .then(response => {
        console.log(response.data.data)
        setPokemons(response.data.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, [setPokemons, page, searchString, sortField, addedPokemon, deletedPokemon])

  return (
    <div className="App">
      <Header />
      <hr />
      <PokemonForm setPokemons={setPokemons} searchString={searchString} addedPokemon={addedPokemon} setAddedPokemon={setAddedPokemon} />
      <hr />
      <PokemonList pokemons={pokemons} setPokemons={setPokemons} searchString={searchString}
        setSearchString={setSearchString} page={page} setPage={setPage} setSortField={setSortField} deletedPokemon={deletedPokemon} setDeletedPokemon={setDeletedPokemon} />
    </div>
  );
}

export default App;
