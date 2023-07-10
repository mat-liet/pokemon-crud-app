package com.crud.pokeapp.api.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder=true)
public class Pokemon {
    private Long id;
    private String name;
    private String type;
    private String move;
}
