import Pokemon from './Pokemon'
import './PokemonList.css';
import Pagination from './Pagination';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonList() {

    const [pokemons, setPokemons] = useState([{ id: 0, name: "", type: "", move: "" }]);

    const [searchString, setSearchString] = useState("");

    const [sortField, setSortField] = useState("name_asc");

    const [deletedPokemon, setDeletedPokemon] = useState(false);

    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:8000/api/pokemon", { params: { filter_name: searchString, page: page, sort_field: sortField } })
            .then(response => {
                setTotal(response.data['total'])
                setPokemons(response.data.data);
                setLoading(false)
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
                        <select className="form-select" name="sortField" defaultValue={"name_asc"} onChange={handleSortFieldChange}>
                            <option value="name_asc">Name (Ascending)</option>
                            <option value="name_desc">Name (Descending)</option>
                            <option value="type_asc">Type (Ascending)</option>
                            <option value="type_desc">Type (Descending)</option>
                        </select>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            ) : (
                <div className="pokemon-list">
                    {pokemons.map((pokemonInList) => <Pokemon key={pokemonInList.id} pokemon={pokemonInList} pokemonList={pokemons}
                        setPokemons={setPokemons} setDeletedPokemon={setDeletedPokemon} />)}
                </div>
            )}

            {pokemons.length > 0 && !loading ? (
                <Pagination page={page} setPage={setPage} total={total} />
            ) : false}
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
        </div>
    )


}

export default PokemonList