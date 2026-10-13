import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Producto } from '../../models/producto';
import { Productos as ProductosService } from '../../servicios/productos';
import { FilterPipe } from '../../pipes/filter-pipe';

@Component({
  imports: [NgFor, RouterModule, FilterPipe, FormsModule],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos implements OnInit{

  palabraClave = '';

  productos = signal<Producto[]>([]);

  constructor(private productosService: ProductosService) {
  }

  ngOnInit(): void {
    this.productos.set(this.productosService.getAll());
  }
}
