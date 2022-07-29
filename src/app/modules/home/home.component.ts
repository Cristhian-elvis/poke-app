import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../core/services/pokemon/pokemon.service";
import {ResourceModel} from "../../core/models/response/response.models";
import {getParamsPokemon} from "../../core/utils/helper/helper";
import {forkJoin, Observable, take} from "rxjs";
import {PokemonModel} from "../../core/models/pokemon/pokemon.models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private resourceCurrent!: ResourceModel;
  public pokemonAll: PokemonModel[];

  constructor(private _pokemonService: PokemonService) {
    this.pokemonAll = []
  }

  ngOnInit(): void {
    this._pokemonService.getPokemonAll().subscribe({
      next: (response: ResourceModel) => {
        this.resourceCurrent = response;
        this.init();
      }
    })
  }

  private init() {
    const pokemon$: Observable<PokemonModel>[] = this.resourceCurrent.results.map((pokemon) => {
      return this._pokemonService.getPokemonByName(pokemon.name);
    })
    forkJoin(pokemon$).subscribe({
      next: (response: PokemonModel[]) => {
        this.pokemonAll = response;
      }
    })
  }

  private getPokemonInfo(name: string) {
    return this._pokemonService.getPokemonByName(name)
  }

  private previousResourcePokemon() {
    const {offset, limit} = getParamsPokemon(this.resourceCurrent.previous);
    this._pokemonService.getPokemonWithOffsetLimit(offset, limit).subscribe()
  }

  private nextResourcePokemon() {
    const {offset, limit} = getParamsPokemon(this.resourceCurrent.next);
    this._pokemonService.getPokemonWithOffsetLimit(offset, limit).subscribe()
  }

}
