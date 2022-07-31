import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PokemonModel} from "../../../core/models/pokemon/pokemon.models";

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit, OnChanges {

  @Input() public pokemonList: PokemonModel[] = [];
  @Input() public mode: modeImg = 'img';
  public pokemonPagination: PokemonModel[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonList']?.currentValue) {
      this.pokemonList = changes['pokemonList']?.currentValue;
      this.pokemonPagination = [];
      this.pokemonPagination = [...this.pokemonPagination, ...this.pokemonList.slice(this.pokemonPagination.length, this.pokemonPagination.length + 20)]
    }
  }

  public nextResourcePokemon() {

    this.pokemonPagination = [...this.pokemonPagination, ...this.pokemonList.slice(this.pokemonPagination.length, this.pokemonPagination.length + 20)]

  }

}

export type modeImg = 'img' | 'gif'
