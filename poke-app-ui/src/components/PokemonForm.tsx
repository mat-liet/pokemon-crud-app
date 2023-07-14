import { useState } from "react";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import PokemonFormInputs from "./PokemonFormInputs";

export default function PokemonForm() {
    const [pokemon, setPokemon] = useState({ id: 0, name: "", type: "Bug", move: "" });

    const handleChange = (event: any) => {
        setPokemon({ ...pokemon, [event.target.name]: event.target.value });
    };

    const [addedPokemon, setAddedPokemon] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("Pokemon created", pokemon);
        axios
            .post("http://localhost:8000/api/pokemon", pokemon)
            .then(response => {
                console.log(response)
                setAddedPokemon(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="container">
            <form action="submit" onSubmit={handleSubmit}>
                <PokemonFormInputs handleChange={handleChange} pokemon={pokemon}></PokemonFormInputs>
                <button type="submit" className="btn btn-primary">Add pokemon</button>
            </form>
            <Modal
                show={addedPokemon}
                backdrop="static"
                onHide={() => setAddedPokemon(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    Added Pokemon
                </Modal.Body>
            </Modal>
        </div>
    )
}