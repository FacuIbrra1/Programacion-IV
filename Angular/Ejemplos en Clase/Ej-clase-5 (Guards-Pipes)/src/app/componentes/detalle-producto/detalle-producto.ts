import { Component, OnInit, signal } from '@angular/core';
import { Productos } from '../../servicios/productos';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { CurrencyPipe, LowerCasePipe, NgIf } from '@angular/common';
import { RegitradoPipe } from '../../pipes/regitrado-pipe';

@Component({
  imports: [NgIf, CurrencyPipe, LowerCasePipe, RegitradoPipe],
  selector: 'app-detalle-producto',
  styleUrl: './detalle-producto.css',
  templateUrl: './detalle-producto.html',
})
export class DetalleProducto implements OnInit {

  producto = signal<Producto | undefined>(undefined);

  constructor(private productos: Productos, 
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      const producto = this.productos.getById(id);
      this.producto.set(producto);
    });
  }
}
