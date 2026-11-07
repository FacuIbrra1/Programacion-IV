import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Autenticacion } from '../../servicios/autenticacion';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../api';

@Component({
  imports: [RouterLink],
  selector: 'app-publicaciones',
  styleUrl: './publicaciones.css',
  templateUrl: './publicaciones.html',
})
export class Publicaciones {
  protected readonly autenticacion = inject(Autenticacion);

  // Las categorías de Potrero Libre. En el Sprint 2 filtran el listado.
  protected readonly categorias = ['General', 'Busco club', 'Busco jugadores', 'Prueba'];

  // PRUEBA TEMPORAL del Paso 7 (se borra en el Paso 8): pide el listado al back.
  constructor() {
    inject(HttpClient).get(`${API_URL}/publicaciones`).subscribe({
      next: (publicaciones) => console.log('Publicaciones:', publicaciones),
      error: (error) => console.log('Error:', error.status, error.error?.message),
    });
  }
}
