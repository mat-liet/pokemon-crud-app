import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Grass', 'Ground',
           'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];
  
  defaultType: string = 'Bug';

  newPokemonForm: FormGroup;

  constructor(private pokemonService: PokemonService) {};

  ngOnInit(): void {
      this.newPokemonForm = new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'type': new FormControl('Bug', [Validators.required]),
        'move': new FormControl(null, [Validators.required]),
      });
  }

  onAddPokemon() {
    console.log(this.newPokemonForm);
    this.pokemonService.onAddPokemon(this.newPokemonForm.value.name, this.newPokemonForm.value.type, this.newPokemonForm.value.move);
  };
  
}
