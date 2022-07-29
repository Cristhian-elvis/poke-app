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
  @HostBinding('style.background-color') background!: string;
  public species: Species[] = []

  constructor() {
  }

  ngOnInit(): void {
  }

  public setBackgroundCard() {
    return this.species.map((specie) => 'type-' + specie.name).join(' ')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'].currentValue) {
      const pokemon: PokemonModel = changes['pokemon'].currentValue;
      this.species = pokemon.types.map((type) => type.type);
    }
  }

  public getNumberPokemon() {
    return this.pokemon.id.toString().padStart(3, '000')
  }

}
