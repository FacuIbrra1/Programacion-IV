import { Service, signal } from '@angular/core';
import { Producto } from '../models/producto';

@Service()
export class Productos {
    productos = signal<Producto[]>([
        {
            id: 1,
            nombre: 'Producto 1',
            precio: 100,
            descripcion: 'Descripción del producto 1'
        },
        {
            id: 2,
            nombre: 'Producto 2',
            precio: 200,
            descripcion: 'Descripción del producto 2'
        },
        {
            id: 3,
            nombre: 'Producto 3',
            precio: 300,
            descripcion: 'Descripción del producto 3'
        }
    ]);

    getAll() {
        return this.productos();
    }

    getById(id: number) {
        return this.productos().find(producto => producto.id === id);
    }
}
