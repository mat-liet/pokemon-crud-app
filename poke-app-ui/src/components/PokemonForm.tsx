import { useState } from "react";
import axios from 'axios';
import Pokemon from "../models/Pokemon";

export default function PokemonForm(props: { pokemons: Pokemon[], setPokemons: any, searchString: string }) {
    const [pokemon, setPokemon] = useState({ id: 0, name: "", type: "Bug", moves: [""] });

    const handleChange = (event: any) => {
        setPokemon({ ...pokemon, [event.target.name]: event.target.value });
    };

    const pokemons = props.pokemons

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("Pokemon created", pokemon);
        axios
            .post("http://localhost:8000/api/pokemon", pokemon)
            .then(response => {
                if (pokemon.name.toLowerCase().includes(props.searchString.toLowerCase())) {
                    let clone = [...pokemons]
                    clone.push(response.data)
                    props.setPokemons(clone)
                }
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="container">
            <form action="submit" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Pokemon name</label>
                    <input type="text" placeholder="Pokemon name" className="form-control" name="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Pokemon type</label>
                    <select className="form-select" onChange={handleChange} name="type">
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
                </div>
                <div className="mb-3">
                    <label htmlFor="moves" className="form-label">Pokemon moves</label>
                    <input type="text" placeholder="Pokemon moves" className="form-control" name="moves" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add pokemon</button>
            </form>
        </div>
    )
}