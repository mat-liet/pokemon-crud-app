package com.crud.pokeapp.service.impl;

import com.crud.pokeapp.api.model.Pokemon;
import com.crud.pokeapp.api.model.PokemonResponse;
import com.crud.pokeapp.exception.PokemonNotFoundException;
import com.crud.pokeapp.persistence.dao.PokemonRepository;
import com.crud.pokeapp.persistence.dao.PokemonSpecification;
import com.crud.pokeapp.persistence.model.PokemonEntity;
import com.crud.pokeapp.service.PokemonService;
import com.crud.pokeapp.service.transform.PokemonTransform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PokemonServiceImpl implements PokemonService {

    @Autowired
    private PokemonRepository pokemonRepository;

    @Autowired
    private PokemonTransform transform;

    @Override
    public Pokemon create(Pokemon pokemon) {
        PokemonEntity savedEntity = pokemonRepository.save(transform.toEntity(pokemon));
        return transform.toApi(savedEntity);
    }

    @Override
    public Pokemon getPokemon(Long id) {
        Optional<PokemonEntity> pokemon = pokemonRepository.findById(id);
        if (pokemon.isPresent()) {
            return transform.toApi(pokemon.get());
        }
        throw new PokemonNotFoundException(id);
    }

    @Override
    public PokemonResponse findAll(int page, String sortString, String filterName) {
        String[] sortByAndDir = sortString.split("_");
        String sortBy = sortByAndDir[0];
        String sortDir = sortByAndDir[1];
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        if (sortBy.equalsIgnoreCase("type")) {
            sort = sort.and(Sort.by("name").ascending());
        }

        Pageable pageable = PageRequest.of(page, 12, sort);

        Page<PokemonEntity> posts = filterName != "" ? pokemonRepository.findAll(PokemonSpecification.findByName(filterName), pageable)
                : pokemonRepository.findAll(pageable);

        return transform.toPokemonResponse(posts);
    }

    @Override
    public Pokemon update(Long id, Pokemon pokemon) {
        Optional<PokemonEntity> pokemonEntity = pokemonRepository.findById(id);
        if (pokemonEntity.isPresent()) {
            Pokemon updatedPokemon = pokemon.toBuilder().id(id).build();
            PokemonEntity savedEntity = pokemonRepository.save(transform.toEntity(updatedPokemon));
            return transform.toApi(savedEntity);
        }
        throw new PokemonNotFoundException(id);
    }

    @Override
    public void delete(Long id) {
        if (pokemonRepository.existsById(id)) {
            pokemonRepository.deleteById(id);
        } else {
            throw new PokemonNotFoundException(id);
        }

    }
}
