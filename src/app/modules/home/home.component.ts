import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../core/services/pokemon/pokemon.service";
import {ResourceModel} from "../../core/models/response/response.models";
import {getParamsPokemon} from "../../core/utils/helper/helper";
import {debounceTime, forkJoin, Observable, Subject, take} from "rxjs";
import {PokemonModel} from "../../core/models/pokemon/pokemon.models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private resourceCurrent!: ResourceModel;
  public pokemonAll: PokemonModel[];

  private loading_next_resource: boolean = false;
  private debounceSubscriber$ = new Subject<string>()

  constructor(private _pokemonService: PokemonService) {
    this.pokemonAll = [];
    this.initDebounceTime();
  }

  ngOnInit(): void {
    this._pokemonService.getPokemonAll().subscribe({
      next: (response: ResourceModel) => {
        this.resourceCurrent = response;
        this.init();
      }
    })
  }

  private initDebounceTime() {
    this.debounceSubscriber$.pipe(
      debounceTime(1000)
    ).subscribe({
      next: (input: string) => {
        this._pokemonService.getPokemonByName(input).subscribe({
          next: (response) => {
            this.pokemonAll = [response]
          }
        })
      }
    })
  }

  private init() {
    const pokemon$: Observable<PokemonModel>[] = this.resourceCurrent.results.map((pokemon) => {
      return this._pokemonService.getPokemonByName(pokemon.name);
    })
    forkJoin(pokemon$).subscribe({
      next: (response: PokemonModel[]) => {
        this.pokemonAll = [...this.pokemonAll, ...response];
        this.loading_next_resource = false;
      }
    })
  }

  private previousResourcePokemon() {
    const {offset, limit} = getParamsPokemon(this.resourceCurrent.previous);
    this._pokemonService.getPokemonWithOffsetLimit(offset, limit).subscribe()
  }

  public nextResourcePokemon() {
    if (!this.resourceCurrent.next || this.loading_next_resource) return;

    this.loading_next_resource = true;

    const {offset, limit} = getParamsPokemon(this.resourceCurrent.next);
    this._pokemonService.getPokemonWithOffsetLimit(offset, limit).subscribe({
      next: (response: ResourceModel) => {
        this.resourceCurrent = response;
        this.init();
      }
    })
  }

  public searchPokemon(evt: Event) {
    // @ts-ignore
    const input = (evt as InputEvent).target?.value?.trim();
    if (!input) return

    this.debounceSubscriber$.next(input)
  }

}
