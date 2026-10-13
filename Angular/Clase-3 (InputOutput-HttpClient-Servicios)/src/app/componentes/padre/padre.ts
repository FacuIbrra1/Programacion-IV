import { Component, signal } from '@angular/core';
import { Hijo } from '../hijo/hijo';

@Component({
  imports: [Hijo],
  selector: 'app-padre',
  styleUrl: './padre.css',
  templateUrl: './padre.html',
})
export class Padre {

  nuevoDato = signal<string>('dato inicial');

  cambiarDato(){
    this.nuevoDato.set('Dato cambiado');
  }
}


