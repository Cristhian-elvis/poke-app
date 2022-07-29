import {Injectable} from '@angular/core';
import {EnvServiceProvider} from "../env/env.service.provider";
import {HttpClient, HttpParams} from "@angular/common/http";
import {of} from "rxjs";
import {ResourceModel} from "../../models/response/response.models";
import {PokemonModel} from "../../models/pokemon/pokemon.models";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly poke_api = '';

  constructor(private http: HttpClient) {
    this.poke_api = EnvServiceProvider.useFactory().POKE_API;
  }

  public getPokemonByName(name: string) {
    return this.http.get<PokemonModel>(this.poke_api + '/pokemon/' + name)
  }

  public getPokemonByOrder(order: number) {
    return this.http.get<PokemonModel>(this.poke_api + '/pokemon/' + order)
  }

  public getPokemonWithOffsetLimit(offset: string, limit: string) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<ResourceModel>(this.poke_api + '/pokemon', {params: params})
  }

  public getPokemonAll() {
    return this.http.get<ResourceModel>(this.poke_api + '/pokemon')
  }
}
