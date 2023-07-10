package com.crud.pokeapp.service.transform;

import com.crud.pokeapp.api.model.Pokemon;
import com.crud.pokeapp.api.model.PokemonResponse;
import com.crud.pokeapp.persistence.model.PokemonEntity;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PokemonTransform {

    public PokemonEntity toEntity(Pokemon pokemon) {
        PokemonEntity entity = new PokemonEntity();
        entity.setId(pokemon.getId());
        entity.setName(pokemon.getName());
        entity.setType(pokemon.getType());
        entity.setMove(pokemon.getMove());
        return entity;
    }

    public Pokemon toApi(PokemonEntity entity) {
        return Pokemon.builder()
                .id(entity.getId())
                .name(entity.getName())
                .type(entity.getType())
                .move(entity.getMove())
                .build();
    }

    public PokemonResponse toPokemonResponse(Page<PokemonEntity> page) {
        List<Pokemon> pokemon = page.stream()
                .map(this::toApi)
                .collect(Collectors.toList());
        return PokemonResponse.builder()
                .data(pokemon)
                .pageNo(page.getNumber() + 1)
                .pageSize(page.getSize())
                .total(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}
