import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-componente-modularizado',
  styleUrl: './componente-modularizado.css',
  templateUrl: './componente-modularizado.html',
})
export class ComponenteModularizado {
  propiedad: string = 'Hola desde el componente modularizado';
}
