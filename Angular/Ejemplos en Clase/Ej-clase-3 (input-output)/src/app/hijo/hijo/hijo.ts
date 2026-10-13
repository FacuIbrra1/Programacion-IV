import { Component, input, model, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-hijo',
  styleUrl: './hijo.scss',
  templateUrl: './hijo.html',
})
export class Hijo {
  valor = input.required<number>(); // si o si requerimos un valor numérico.
  incrementar = output<void>(); // evento que se dispara cuando el usuario hace click en el botón de incrementar.
  decrementar = output<void>(); // evento que se dispara cuando el usuario hace click en el botón de decrementar.

  contadorModel = model(0);   //Emitimos los eventos al padre para que este se encargue de actualizar el contador y el historial.
  sumar (){
    this.incrementar.emit(); // Devuelve el evento al padre para que este se encargue de actualizar el contador y el historial.
  }

  restar (){
    this.decrementar.emit();
  }

  sumarModel() {
    this.contadorModel.update(valor => valor + 1);
  }

  restarModel() {
    this.contadorModel.update(valor => valor - 1);
  }
}
