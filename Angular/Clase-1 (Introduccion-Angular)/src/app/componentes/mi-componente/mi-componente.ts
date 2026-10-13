import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-componente',
  imports: [FormsModule],
  templateUrl: './mi-componente.html',
  styleUrl: './mi-componente.css',
})
export class MiComponente {
  nombre = signal('Juan');
  edad1 = signal(0);
  edad2 = signal(0);
  resultado = signal(0);
  array = signal([1, 2, 3, 4, 5]);

  calcularEdad(){
    let edad1 = this.edad1();
    let edad2 = this.edad2();
    let resultadoSumado = edad1 + edad2;
    this.resultado.set(resultadoSumado);
  }
}
