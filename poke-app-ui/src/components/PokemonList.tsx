import Pokemon from './Pokemon'
import './PokemonList.css';
import PokemonModel from '../models/Pokemon';
import Pagination from './Pagination';
import { Modal } from 'react-bootstrap';

function PokemonList(props: {
    pokemons: PokemonModel[], setPokemons: any, searchString: string,
    setSearchString: any, page: Number, setPage: any, setSortField: any,
    deletedPokemon: boolean, setDeletedPokemon: any
}) {

    const pokemons: PokemonModel[] = props.pokemons

    const page: Number = props.page

    const handleFilterChange = (event: any) => {
        props.setSearchString(event.target.value)
        props.setPage(1)
        console.log(props.searchString)
    };

    const handleSortFieldChange = (event: any) => {
        console.log(event.target.value)
        props.setSortField(event.target.value)
        props.setPage(1)
    };

    return (
        <div className="container">
            <div className="filter-sort-container container">
                <div className="row g-3 align-items-center filter-area">
                    <div className="col-auto">
                        <label htmlFor="nameFilter" className="col-form-label">Filter by name:</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" name="searchString" className="form-control" onChange={handleFilterChange} />
                    </div>
                </div>
                <div className="row g-3 align-items-center filter-area">
                    <div className="col-auto">
                        <label htmlFor="nameFilter" className="col-form-label">Sort by</label>
                    </div>
                    <div className="col-auto">
                        <select className="form-select" name="sortField" defaultValue={"nameAsc"} onChange={handleSortFieldChange}>
                            <option value="nameAsc">Name (Ascending)</option>
                            <option value="nameDesc">Name (Descending)</option>
                            <option value="typeAsc">Type (Ascending)</option>
                            <option value="typeDesc">Type (Descending)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="pokemon-list">
                {pokemons.map((pokemonInList) => <Pokemon key={pokemonInList.id} pokemon={pokemonInList} pokemonList={pokemons}
                    setPokemons={props.setPokemons} setDeletedPokemon={props.setDeletedPokemon} />)}
            </div>
            {pokemons.length > 0 ? (
                <Pagination page={page} setPage={props.setPage} />
            ) : (null)}
            {props.deletedPokemon ? (
                <Modal
                    show={props.deletedPokemon}
                    backdrop="static"
                    onHide={() => props.setDeletedPokemon(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        Deleted pokemon!
                    </Modal.Body>
                </Modal>
            ) : null}
        </div>
    )


}

export default PokemonList