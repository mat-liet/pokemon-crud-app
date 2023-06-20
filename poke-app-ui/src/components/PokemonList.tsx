import Pokemon from './Pokemon'
import './pokemonList.css';
import PokemonModel from '../models/Pokemon';
import axios from 'axios';
import { useState } from 'react';

function PokemonList(props: { pokemons: PokemonModel[], setPokemons: any, searchString: string, setSearchString: any }) {
    type sortOptions = {
        [key: string]: any
    }

    const pokemons: PokemonModel[] = props.pokemons

    const [sortField, setSortField] = useState("nameAsc");

    const sortMethods: sortOptions = {
        nameAsc: { method: (a: PokemonModel, b: PokemonModel) => (a.name > b.name) ? 1 : -1 },
        nameDesc: { method: (a: PokemonModel, b: PokemonModel) => (a.name > b.name) ? -1 : 1 },
        typeAsc: { method: (a: PokemonModel, b: PokemonModel) => (a.type > b.type) ? 1 : -1 },
        typeDesc: { method: (a: PokemonModel, b: PokemonModel) => (a.type > b.type) ? -1 : 1 },
      };

    const handleChange = (event: any) => {
        props.setSearchString(event.target.value);
    };

    const handleSortFieldChange = (event: any) => {
        console.log(event.target.value)
        setSortField(event.target.value);
    };

    const handleFilter = (event: any) => {
        console.log("Pokemon filtered");
        axios
            .get("http://localhost:8000/api/pokemon", { params: { filter_name: props.searchString } })
            .then(response => {
                props.setPokemons(response.data)
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='container'>
            <div className="container filter-sort-container">
                <div className="row g-3 align-items-center filter-area">
                    <div className="col-auto">
                        <label htmlFor="nameFilter" className="col-form-label">Filter by name:</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" name="searchString" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="col-auto">
                        <button className='btn btn-primary' onClick={handleFilter}>Filter</button>
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
            <div className='container pokemon-list'>
                {pokemons.sort(sortMethods[sortField].method).map((pokemonInList) => <Pokemon key={pokemonInList.id} pokemon={pokemonInList} pokemonList={pokemons} setPokemons={props.setPokemons} />)}
            </div>
        </div>
    )


}

export default PokemonList