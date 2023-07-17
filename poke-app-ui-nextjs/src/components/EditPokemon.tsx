import axios from 'axios';
import React, { useState } from 'react'
import Pokemon from '../models/Pokemon';
import styles from './EditPokemon.module.css'
import PokemonFormInputs from './PokemonFormInputs';

function EditPokemon(props: { pokemon: Pokemon, showEdit: any, pokemonList: any, setPokemons: any }) {
    const pokemon = props.pokemon
    const pokemonList = props.pokemonList

    const [edittedPokemon, setPokemon] = useState({ id: pokemon.id, name: pokemon.name, type: pokemon.type, move: pokemon.move });

    const handleChange = (event: any) => {
        setPokemon({ ...edittedPokemon, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("Pokemon updated", edittedPokemon);
        let url = `http://localhost:8000/api/pokemon/${pokemon.id}`
        axios
            .put(url, edittedPokemon)
            .then(response => {
                console.log(response)
                const updatedPokemon = pokemonList.map((pokemonInList: Pokemon) => {
                    if (pokemonInList.id === pokemon.id) {
                        pokemonInList.name = edittedPokemon.name
                        pokemonInList.type = edittedPokemon.type
                        pokemonInList.move = edittedPokemon.move
                    }
                    return pokemonInList;
                })
                props.setPokemons(updatedPokemon)
                props.showEdit(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleCancel = (event: any) => {
        props.showEdit(false)
    }

    return (
        <div className={`${styles.card} card`}>
            <div className={`${styles.cardBody} card-body`}>
                <form action="submit" onSubmit={handleSubmit}>
                    <PokemonFormInputs handleChange={handleChange} pokemon={edittedPokemon}></PokemonFormInputs>
                    <button type="submit" className={`${styles.btnEdit} btn btn-primary`}>Save</button>
                    <button className={`${styles.btnEdit} btn btn-danger`} onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default EditPokemon