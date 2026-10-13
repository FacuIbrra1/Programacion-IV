import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiComponente } from './componentes/mi-componente/mi-componente';

@Component({
  selector: 'app-root', // Sirve para porder llamarlo desde un arhcivo.html
  imports: [RouterOutlet, MiComponente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //readonly: no se puede modificar desde afuera de la clase, solo desde adentro.  Singnal: es una variable reactiva, que cuando cambia su valor, se actualiza en la vista. 
  protected title = signal('Clase-1'); 
  
  constructor(){
    // this.title = signal('Hola, Clase-01');
    setTimeout(() => {
      this.title.set('Helola, Clase-01 - updated');
      console.log(this.title);
  }, 1000);}
}
