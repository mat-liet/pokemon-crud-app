package com.crud.pokeapp.persistence.dao;

import com.crud.pokeapp.persistence.model.PokemonEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class PokemonSpecification {
    public static Specification<PokemonEntity> findByName(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }
}
