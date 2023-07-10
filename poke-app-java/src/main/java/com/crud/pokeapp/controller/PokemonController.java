package com.crud.pokeapp.controller;

import com.crud.pokeapp.api.model.Pokemon;
import com.crud.pokeapp.api.model.PokemonResponse;
import com.crud.pokeapp.service.PokemonService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/api")
public class PokemonController {

    private PokemonService pokemonService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/pokemon", produces = "application/json")
    public PokemonResponse pokemon(@RequestParam(value = "page", defaultValue = "0") int page,
                                   @RequestParam(value = "sort_field", defaultValue = "name_asc") String sortField,
                                   @RequestParam(value = "filter_name", defaultValue = "") String filterName) {
        return pokemonService.findAll(page - 1, sortField, filterName);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/pokemon/{id}", produces = "application/json")
    public Pokemon pokemon(@PathVariable Long id) {
        return pokemonService.getPokemon(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/pokemon", produces = "application/json", consumes = "application/json")
    public Pokemon newPokemon(@RequestBody Pokemon pokemon) {
        return pokemonService.create(pokemon);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value = "/pokemon/{id}", produces = "application/json", consumes = "application/json")
    public Pokemon updatePokemon(@PathVariable Long id, @RequestBody Pokemon pokemon) {
        return pokemonService.update(id, pokemon);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/pokemon/{id}")
    public void deletePokemon(@PathVariable Long id) {
        pokemonService.delete(id);
    }
}
