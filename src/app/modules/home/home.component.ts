import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../core/services/pokemon/pokemon.service";
import {ResourceModel} from "../../core/models/response/response.models";
import {getParamsPokemon} from "../../core/utils/helper/helper";
import {debounceTime, forkJoin, Observable, Subject} from "rxjs";
import {PokemonModel} from "../../core/models/pokemon/pokemon.models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private resourceCurrent!: ResourceModel;
  public pokemonAll: PokemonModel[];
  public pokemonList: PokemonModel[];

  private loading_next_resource: boolean = false;
  private debounceSubscriber$ = new Subject<string>();

  public loadingPage: boolean;
  public isFilter: boolean;

  public modeCard: 'img' | 'gif' = 'img';

  constructor(private _pokemonService: PokemonService) {
    this.loadingPage = true;
    this.isFilter = false;
    this.pokemonAll = [];
    this.pokemonList = [];
    this.initDebounceTime();
    this.getPokemonAll()
  }

  ngOnInit(): void {
  }

  private initDebounceTime() {
    this.debounceSubscriber$.pipe(
      debounceTime(0)
    ).subscribe({
      next: (input: string) => {
        this.pokemonList = this.pokemonAll.filter((pokemon) => pokemon.name.startsWith(input))
      }
    })
  }

  private getPokemonAll() {
    this._pokemonService.getPokemonAll().subscribe({
      next: (response) => {
        this.resourceCurrent = response;
        this.getInformationPokemon();
      }
    })
  }

  private getInformationPokemon() {
    const pokemon$: Observable<PokemonModel>[] = this.resourceCurrent.results.map((pokemon) => {
      return this._pokemonService.getPokemonByName(pokemon.name);
    })
    forkJoin(pokemon$).subscribe({
      next: (response: PokemonModel[]) => {
        this.loadingPage = false;
        this.pokemonAll = response;
        this.pokemonList = this.pokemonAll.slice(0, 20);
      }
    })
  }



  public searchPokemon(evt: Event) {
    this.isFilter = true;
    // @ts-ignore
    const input = (evt as InputEvent).target?.value?.trim().toLowerCase();
    if (!input) {
      this.isFilter = false;
      this.pokemonList = this.pokemonAll.slice(0, 20);
      return
    }

    this.debounceSubscriber$.next(input)
  }

  changeModeCard(evt: any){
    if(evt.target.checked){
      this.modeCard = 'img'
    }else{
      this.modeCard = 'gif'
    }
  }

}
