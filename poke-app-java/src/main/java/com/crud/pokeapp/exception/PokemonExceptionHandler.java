package com.crud.pokeapp.exception;

import com.crud.pokeapp.api.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.Instant;

@ControllerAdvice
public class PokemonExceptionHandler {

    @ExceptionHandler(PokemonNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handlePokemonNotFoundException(PokemonNotFoundException e) {
        HttpStatus notFound = HttpStatus.NOT_FOUND;
        ErrorResponse response = ErrorResponse.builder()
                .message(e.getMessage())
                .status(notFound.name())
                .code(notFound.value())
                .timestamp(Instant.now())
                .build();
        return new ResponseEntity<>(response, notFound);
    }
}
