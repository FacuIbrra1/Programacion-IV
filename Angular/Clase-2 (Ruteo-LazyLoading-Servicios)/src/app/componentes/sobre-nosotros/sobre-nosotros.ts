import { Component } from '@angular/core';
import { MiServicio } from '../../servicios/mi-servicio';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-sobre-nosotros',
  styleUrl: './sobre-nosotros.css',
  templateUrl: './sobre-nosotros.html',
})
export class SobreNosotros {

    constructor(private Servicio: MiServicio) {}
  
    sumar(){
      this.Servicio.sumar();
    }
}
