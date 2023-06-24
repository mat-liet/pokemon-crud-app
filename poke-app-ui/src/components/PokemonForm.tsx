import { useState } from "react";
import axios from 'axios';
import { Modal } from "react-bootstrap";

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
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Pokemon name</label>
                    <input type="text" placeholder="Pokemon name" className="form-control" name="name" onChange={handleChange} required/>
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
                    <label htmlFor="moves" className="form-label">Signature move</label>
                    <input type="text" placeholder="Signature move" className="form-control" name="move" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add pokemon</button>
            </form>
            {addedPokemon ? (
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
            ) : false}
        </div>
    )
}