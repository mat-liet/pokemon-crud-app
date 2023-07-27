import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { PokemonGetResponse } from "../models/pokemon-get-response.model";

@Injectable()
export class PokemonService {

    constructor(private http: HttpClient) { }

    onAddPokemon(name: string, type: string, move: string) {
        this.http.post(
            'http://localhost:8000/api/pokemon',
            { name: name, type: type, move: move },
            {observe: 'response'}
        ).subscribe(responseData => {
            console.log(responseData.status);
        });
    }

    getAllPokemon(page: string, filterName: string, sortString: string): Observable<PokemonGetResponse> {
        console.log(`Page: ${page}, filter: ${filterName}, sort: ${sortString}`)
        return this.http.get<PokemonGetResponse>(
            `http://localhost:8000/api/pokemon?sort_field=${sortString}&page=${page}&filter_name=${filterName}`
        )
        .pipe(map(responseData => {
            console.log(responseData)
            return responseData;
        }));
    }
}