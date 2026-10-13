import { Component, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { Data } from '../../servicios/data';
import { Http } from '../../servicios/http';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { Character } from '../../servicios/models/character';

@Component({
  imports: [NgFor],
  selector: 'app-pagina-uno',
  styleUrl: './pagina-uno.css',
  templateUrl: './pagina-uno.html',
})
export class PaginaUno implements OnInit, OnDestroy, OnChanges {

  gotList = signal<Character[]>([]);
  suscription: Subscription | undefined;

  // Inyectamos el servicio Data en el constructor de la clase PaginaUno
  constructor(public data: Data, private dataService: Http){}

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    console.log("PaginaUno: ngOnDestroy: Suscripción cancelada");
  }

  sumar(){
    this.data.agregar();
  }

  restar(){
    this.data.restar();
  }

  ngOnInit(): void {
    this.suscription = this.dataService.TraeData('https://thronesapi.com/api/v2/Characters')
    .subscribe({
      next: (data: Character[]) => {
        console.log("Datos recibidos:", data);
        this.gotList.set(data);
      },
      error: (error) => {
        console.error("Error al obtener los datos:", error);
      },
      complete: () => {
        console.log("Solicitud completada");
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
}
