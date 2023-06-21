import React, { useState } from 'react'
import './Pokemon.css';
import axios from 'axios';
import EditPokemon from './EditPokemon';
import PokemonModel from '../models/Pokemon';
import PokemonDetail from './PokemonDetail';

function Pokemon(props: { pokemon: PokemonModel, pokemonList: PokemonModel[], setPokemons: any }) {
    const pokemon = props.pokemon

    const pokemons = props.pokemonList

    const [showEdit, setEdit] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleEdit = (event: any) => {
        console.log("Edit button clicked")
        setEdit(true)
    }

    function setShowEdit(showEdit: boolean) {
        setEdit(showEdit)
    }

    function handleDelete(id: number) {
        console.log(`Deleting pokemon with id ${id}`)
        let url = `http://localhost:8000/api/pokemon/${id}`
        axios
            .delete(url)
            .then(response => {
                console.log(response)
                const res = pokemons.filter((obj: { id: any; }) => obj.id !== id);
                props.setPokemons(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    if (showEdit === true) {
        return (
            <EditPokemon pokemon={pokemon} showEdit={setShowEdit} pokemonList={pokemons} setPokemons={props.setPokemons} />
        )
    } else {
        return (
            <div key={pokemon.id} className='card'>
                <img src="https://d2x6j2p7.rocketcdn.me/wp-content/uploads/2019/08/How-to-draw-Pikachu-1.jpg" alt="" className='card-img-top' />
                <div className='card-body'>
                    <h5>Name: {pokemon.name}</h5>
                    <p>Type: {pokemon.type}</p>
                    <p>Moves: {pokemon.moves}</p>
                    <button className='btn btn-success btn-pokemon-card' onClick={() => setShowModal(true)}>More info</button>
                    <PokemonDetail showModal={showModal} setShowModal={setShowModal} pokemon={pokemon}/>
                    <button className='btn btn-primary btn-pokemon-card' onClick={handleEdit}>Edit</button>
                    <button className='btn btn-danger btn-pokemon-card' onClick={() => handleDelete(pokemon.id)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Pokemon