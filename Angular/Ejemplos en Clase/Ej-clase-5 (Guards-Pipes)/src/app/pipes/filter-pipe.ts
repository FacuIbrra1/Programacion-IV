import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(productos: Producto[], palabraClave: string): Producto[] {
    return productos.filter(producto => producto.nombre.toLowerCase().includes(palabraClave.toLowerCase()));
  }
}
