import { Pokemon } from "./pokemon.model";

export class PokemonGetResponse {
    public total: number;
    public data: Pokemon[];
    public total_pages: number;

    constructor(total: number, data: Pokemon[], total_pages: number) {
        this.total = total;
        this.data = data;
        this.total_pages = total_pages;
    }
}
