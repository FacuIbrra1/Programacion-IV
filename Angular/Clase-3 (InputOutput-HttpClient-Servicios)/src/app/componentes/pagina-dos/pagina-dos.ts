import { Component, OnInit } from '@angular/core';
import { Data } from '../../servicios/data';

@Component({
  imports: [],
  selector: 'app-pagina-dos',
  styleUrl: './pagina-dos.css',
  templateUrl: './pagina-dos.html',
})
export class PaginaDos implements OnInit {

  numero: number = 0;

  // Inyectamos el servicio Data en el constructor de la clase PaginaUno
  constructor(public data: Data){}

  sumar(){
    this.data.agregar();
  }

  restar(){
    this.data.restar();
  }

  ngOnInit(){
    this.numero = this.data.numero();
  }

}
