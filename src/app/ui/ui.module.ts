import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeCardComponent } from './components/poke-card/poke-card.component';



@NgModule({
    declarations: [
        PokeCardComponent
    ],
    exports: [
        PokeCardComponent
    ],
    imports: [
        CommonModule
    ]
})
export class UiModule { }
