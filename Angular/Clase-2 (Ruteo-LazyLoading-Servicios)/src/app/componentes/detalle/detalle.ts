import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Las interfaces las vamos a utilizar para definir tipos de datos a las clases. (Definir estucturas de datos).
interface ItemMock {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  imports: [],
  selector: 'app-detalle',
  styleUrl: './detalle.css',
  templateUrl: './detalle.html',
})
export class Detalle implements OnInit, OnDestroy {

  itemEncontrado: ItemMock | undefined;
  items: ItemMock[] = [
    {
      id: 1,
      nombre: 'Mochila Urbana',
      descripcion: 'Mochila liviana para uso diario con bolsillos organizadores.',
    },
    {
      id: 2,
      nombre: 'Auriculares Inalambricos',
      descripcion: 'Auriculares bluetooth con cancelacion de ruido y 20 horas de bateria.',
    },
    {
      id: 3,
      nombre: 'Botella Termica',
      descripcion: 'Botella de acero inoxidable que mantiene temperatura por varias horas.',
    },
    {
      id: 4,
      nombre: 'Cuaderno Inteligente',
      descripcion: 'Cuaderno reutilizable con hojas borrables y escaneo digital rapido.',
    },
  ];

  suscripcion!: Subscription;

  // route: ActivatedRoute sirve para obtener el parametro que se pasa por la URL, en este caso el id del item. Se lo conoce como "servicio".
  constructor(private route: ActivatedRoute){

  }

  //  ngOnInit() sirve para inicializar el componente. se lo conoce como "observable".
  ngOnInit(): void {
    // suscribe() sirve para actualizar el valor del parametro cada vez que cambia.

    this.suscripcion = this.route.paramMap.subscribe(params => {
      const itemId = params.get('id');
      if (itemId){
        this.itemEncontrado = this.items.find(item => item.id === +itemId);
      }
      else {
        this.itemEncontrado = undefined;
      }

    // queryParamsMap lo utilizamos cuando las rutas son obligatorias. 
    // this.route.queryParamMap.subscribe(params => {
    //   const itemId = params.get('id');
    //   if (itemId) {
    //     this.itemEncontrado = this.items.find(item => item.id === +itemId);
    //   } else {
    //     this.itemEncontrado = undefined;
    //   }
    
    // queryParams lo utilizamos cuando las rutas son opcionales. 
    //this.route.queryParams.subscribe(params => {
    //  const itemId = params['id'];
    //  if (itemId) {
    //    this.itemEncontrado = this.items.find(item => item.id === +itemId);
    //  } else {
    //    this.itemEncontrado = undefined;
    //  }

    });
  }

    ngOnDestroy(): void {
    this.suscripcion.unsubscribe(); // sirve para limpiar las suscripciones que sigan vivas.
  }


}
