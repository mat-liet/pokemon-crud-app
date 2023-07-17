import Pokemon from "../models/Pokemon"

function PokemonFormInputs(props: { handleChange: any, pokemon: Pokemon }) {

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Pokemon name</label>
                <input type="text" placeholder="Pokemon name" className="form-control" name="name" value={props.pokemon.name} onChange={props.handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Pokemon type</label>
                <select className="form-select" name="type" onChange={props.handleChange} value={props.pokemon.type}>
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
                <input type="text" placeholder="Signature move" className="form-control" name="move" value={props.pokemon.move} onChange={props.handleChange} required />
            </div>
        </div>

    )
}

export default PokemonFormInputs