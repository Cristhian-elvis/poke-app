import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";



@NgModule({
    declarations: [
        PokeCardComponent,
        PokeListComponent
    ],
  exports: [
    PokeCardComponent,
    PokeListComponent
  ],
    imports: [
        CommonModule,
        InfiniteScrollModule
    ]
})
export class UiModule { }
