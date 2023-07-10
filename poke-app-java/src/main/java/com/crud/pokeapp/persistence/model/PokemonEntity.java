package com.crud.pokeapp.persistence.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "pokemon")
@Getter
@Setter
@NoArgsConstructor
public class PokemonEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String name;

    private String type;

    private String move;

    public PokemonEntity(String name, String type, String move) {
        this.name = name;
        this.type = type;
        this.move = move;
    }
}