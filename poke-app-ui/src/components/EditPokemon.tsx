import axios from 'axios';
import React, { useState } from 'react'
import Pokemon from '../models/Pokemon';
import './EditPokemon.css'

function EditPokemon(props: { pokemon: Pokemon, showEdit: any, pokemonList: any, setPokemons: any }) {
    const pokemon = props.pokemon
    const pokemonList = props.pokemonList

    const [edittedPokemon, setPokemon] = useState({ name: pokemon.name, type: pokemon.type, move: pokemon.move });

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
        <div className='card'>
            <div className='card-body'>
            <form action="submit" onSubmit={handleSubmit}>
            <h5>Name</h5>
                <input type="text" placeholder="Pokemon name" value={edittedPokemon.name} className="form-control" name="name" onChange={handleChange} />
                <p>Type</p>
                <select className="form-select" name="type" onChange={handleChange} value={edittedPokemon.type}>
                    <option value="Bug">Bug</option>
                    <option value="Dark">Dark</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Electric">Electric</option>
                    <option value="Fairy">Fairy</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Fire">Fire</option>
                    <option value="Flying">Ghost</option>
                    <option value="Grass">Grass</option>
                    <option value="Ground">Ground</option>
                    <option value="Ice">Ice</option>
                    <option value="Normal">Normal</option>
                    <option value="Poison">Poison</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Rock">Rock</option>
                    <option value="Steel">Steel</option>
                    <option value="Water">Water</option>
                </select>
                <p>Signature move</p>
                <input type="text" placeholder="Signature move" value={edittedPokemon.move} className="form-control" name='move' onChange={handleChange} />
                <button type='submit' className='btn btn-primary btn-edit'>Save</button>
                <button className='btn btn-danger btn-edit' onClick={handleCancel}>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default EditPokemon