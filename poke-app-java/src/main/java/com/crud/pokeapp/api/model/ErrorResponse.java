package com.crud.pokeapp.api.model;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Builder
@Data
public class ErrorResponse {

    private Instant timestamp;

    private String status;

    private int code;

    private String message;
}
