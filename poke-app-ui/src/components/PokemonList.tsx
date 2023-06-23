import Pokemon from './Pokemon'
import './PokemonList.css';
import PokemonModel from '../models/Pokemon';
import { useState } from 'react';
import Pagination from './Pagination';

function PokemonList(props: { pokemons: PokemonModel[], setPokemons: any, searchString: string, setSearchString: any, page: Number, setPage: any }) {
    type sortOptions = {
        [key: string]: any
    }

    const pokemons: PokemonModel[] = props.pokemons

    const page: Number = props.page

    const [sortField, setSortField] = useState("nameAsc");

    const sortMethods: sortOptions = {
        nameAsc: { method: (a: PokemonModel, b: PokemonModel) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1 },
        nameDesc: { method: (a: PokemonModel, b: PokemonModel) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1 },
        typeAsc: { method: (a: PokemonModel, b: PokemonModel) => (a.type.toLowerCase() > b.type.toLowerCase()) ? 1 : -1 },
        typeDesc: { method: (a: PokemonModel, b: PokemonModel) => (a.type.toLowerCase() > b.type.toLowerCase()) ? -1 : 1 },
    };

    const handleFilterChange = (event: any) => {
        props.setSearchString(event.target.value);
        props.setPage(1)
        console.log(props.searchString)
    };

    const handleSortFieldChange = (event: any) => {
        console.log(event.target.value)
        setSortField(event.target.value);
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
                {pokemons.sort(sortMethods[sortField].method).map((pokemonInList) => <Pokemon key={pokemonInList.id} pokemon={pokemonInList} pokemonList={pokemons} setPokemons={props.setPokemons} />)}
            </div>
            {pokemons.length > 0 ? (
                <Pagination page={page} setPage={props.setPage}/>
            ) : (null)}
            

        </div>
    )


}

export default PokemonList