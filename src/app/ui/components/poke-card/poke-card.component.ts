import {Component, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PokemonModel, Species} from "../../../core/models/pokemon/pokemon.models";

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent implements OnInit, OnChanges {

  //https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png
  @Input() pokemon!: PokemonModel;
  @Input() mode: 'img' | 'gif' = 'gif'
  public species: Species[] = [];
  public id: string = '000';

  constructor() {
  }

  ngOnInit(): void {
  }

  public setBackgroundCard() {
    return this.species.map((specie) => 'type-' + specie.name).join(' ')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']?.currentValue) {
      const pokemon: PokemonModel = changes['pokemon'].currentValue;
      this.species = pokemon.types.map((type) => type.type);
      this.getNumberPokemon()
    }

    if (changes['mode']?.currentValue) {
      this.mode = changes['mode'].currentValue;
    }
  }

  public getNumberPokemon() {
    this.id = this.pokemon.id.toString().padStart(3, '000');
  }

}
