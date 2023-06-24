import Pokemon from './Pokemon'
import './PokemonList.css';
import PokemonModel from '../models/Pokemon';
import Pagination from './Pagination';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonList() {

    const [pokemons, setPokemons] = useState([{ id: 0, name: "", type: "", move: "" }]);

    const [searchString, setSearchString] = useState("");

    const [sortField, setSortField] = useState("nameAsc");

    const [deletedPokemon, setDeletedPokemon] = useState(false);

    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pokemon", { params: { filter_name: searchString, page: page, sort_field: sortField } })
            .then(response => {
                setTotal(response.data['total'])
                setPokemons(response.data.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, [setPokemons, page, searchString, sortField, deletedPokemon])

    const handleFilterChange = (event: any) => {
        setSearchString(event.target.value)
        setPage(1)
    };

    const handleSortFieldChange = (event: any) => {
        setSortField(event.target.value)
        setPage(1)
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
                    setPokemons={setPokemons} setDeletedPokemon={setDeletedPokemon} />)}
            </div>
            {pokemons.length > 0 ? (
                <Pagination page={page} setPage={setPage} total={total} />
            ) : (null)}
            {deletedPokemon ? (
                <Modal
                    show={deletedPokemon}
                    backdrop="static"
                    onHide={() => setDeletedPokemon(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        Deleted pokemon!
                    </Modal.Body>
                </Modal>
            ) : false}
        </div>
    )


}

export default PokemonList