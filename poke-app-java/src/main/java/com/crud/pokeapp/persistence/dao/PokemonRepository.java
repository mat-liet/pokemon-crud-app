package com.crud.pokeapp.persistence.dao;

import com.crud.pokeapp.persistence.model.PokemonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonRepository extends JpaRepository<PokemonEntity, Long>, JpaSpecificationExecutor<PokemonEntity> {
}
