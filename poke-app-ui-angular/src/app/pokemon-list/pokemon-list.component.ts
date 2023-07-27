import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { Pokemon } from "../models/pokemon.model";

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

    filterString: string = '';

    sortString: string = 'name_asc';

    currentPage: number = 1;

    totalPages: number = 10;

    loadedPokemon: Pokemon[] = []

    constructor(private pokemonService: PokemonService) { }

    ngOnInit() {
        console.log('On init fired in List component!');
        this.pokemonService.getAllPokemon(this.currentPage.toString(), this.filterString, this.sortString).subscribe(pokemon => {
            this.loadedPokemon = pokemon.data
            this.totalPages = pokemon.total_pages
        })
    }

    setNewPageData(newPageEvent: number) {
        this.currentPage = newPageEvent;
        this.pokemonService.getAllPokemon(newPageEvent.toString(), this.filterString, this.sortString).subscribe(pokemon => {
            this.loadedPokemon = pokemon.data
            this.totalPages = pokemon.total_pages
        })
    }

    setNewPageDataFilter(newFilter: string) {
        this.filterString = newFilter;
        this.currentPage = 1;
        this.pokemonService.getAllPokemon(this.currentPage.toString(), newFilter, this.sortString).subscribe(pokemon => {
            this.loadedPokemon = pokemon.data
            this.totalPages = pokemon.total_pages
        })
    }

    setNewPageDataSort(newSort: string) {
        this.sortString = newSort;
        this.currentPage = 1;
        this.pokemonService.getAllPokemon(this.currentPage.toString(), this.filterString, newSort).subscribe(pokemon => {
            this.loadedPokemon = pokemon.data
            this.totalPages = pokemon.total_pages
        })
    }

}