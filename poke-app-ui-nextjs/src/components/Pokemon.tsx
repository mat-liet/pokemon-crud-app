import React, { useState } from 'react'
import styles from './Pokemon.module.css';
import axios from 'axios';
import EditPokemon from './EditPokemon';
import PokemonModel from '../models/Pokemon';
import PokemonDetail from './PokemonDetail';

function Pokemon(props: { pokemon: PokemonModel, pokemonList: PokemonModel[], setPokemons: any, setDeletedPokemon: any }) {
    const pokemon = props.pokemon

    const pokemons = props.pokemonList

    const [showEdit, setEdit] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [detail, setDetail] = useState({ weight: "", height: "", stats: [{ base_stat: "", stat: { name: "" } }], sprites: { front_default: "" } });

    const [erroredResponse, setErroredResponse] = useState(false);

    const handleEdit = (event: any) => {
        console.log("Edit button clicked")
        setEdit(true)
    }

    function handleMoreInfo() {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}/`
        axios.get(url)
            .then(response => {
                console.log(response)
                setDetail(response.data)
                setShowModal(true)
            })
            .catch(error => {
                setErroredResponse(true)
                setShowModal(true)
            })
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
                props.setDeletedPokemon(true)
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
            <div key={pokemon.id} className={`${styles.card} card`}>
                <div className={`${styles.cardBody} card-body`}>
                    <h5 className="card-title">Name: {pokemon.name}</h5>
                    <p className="card-text">Type: {pokemon.type}</p>
                    <p className="card-text">Signature move: {pokemon.move}</p>
                    <button className={`${styles.btnPokemonCard} btn btn-success`} onClick={handleMoreInfo}>More info</button>
                    {showModal ?
                        <PokemonDetail setShowModal={setShowModal} pokemon={pokemon} detail={detail} showModal={showModal} erroredResponse={erroredResponse} />
                        : false
                    }
                    <button className={`${styles.btnPokemonCard} btn btn-primary`} onClick={handleEdit}>Edit</button>
                    <button className={`${styles.btnPokemonCard} btn btn-danger`} onClick={() => handleDelete(pokemon.id)}>Delete</button>
                </div>
            </div>

        )
    }
}

export default Pokemon