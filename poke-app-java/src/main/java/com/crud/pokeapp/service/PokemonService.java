package com.crud.pokeapp.service;

import com.crud.pokeapp.api.model.Pokemon;
import com.crud.pokeapp.api.model.PokemonResponse;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PokemonService {

    Pokemon create(Pokemon pokemon);

    Pokemon getPokemon(Long id);

    PokemonResponse findAll(int page, String sortBy, String filterName);

    Pokemon update(Long id, Pokemon pokemon);

    void delete(Long id);
}
