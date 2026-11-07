import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Autenticacion } from '../../servicios/autenticacion';
import { PublicacionesService } from '../../servicios/publicaciones-service';
import { Publicacion } from '../../models/publicacion';
import { TarjetaPublicacion } from '../tarjeta-publicacion/tarjeta-publicacion';
import { mensajesDeError } from '../../api';

@Component({
  imports: [RouterLink, TarjetaPublicacion],
  selector: 'app-publicaciones',
  styleUrl: './publicaciones.css',
  templateUrl: './publicaciones.html',
})
export class Publicaciones implements OnInit {
  protected readonly autenticacion = inject(Autenticacion);
  private readonly publicacionesService = inject(PublicacionesService);

  // Las categorías de Potrero Libre. En el Paso 9 filtran el listado.
  protected readonly categorias = ['General', 'Busco club', 'Busco jugadores', 'Prueba'];

  protected readonly publicaciones = signal<Publicacion[]>([]);
  protected readonly cargando = signal(false);
  protected readonly erroresServidor = signal<string[]>([]);

  ngOnInit(): void {
    // Sin sesión no se pide nada: el back respondería 401 (los guards llegan en el Sprint 3).
    if (this.autenticacion.usuario()) {
      this.cargar();
    }
  }

  // Paso 8: las 10 más nuevas. El orden por me gusta, el paginado y el filtro llegan en el Paso 9.
  private cargar() {
    this.cargando.set(true);
    this.erroresServidor.set([]);

    this.publicacionesService.listar({ orden: 'fecha', offset: 0, limit: 10 }).subscribe({
      next: (publicaciones) => {
        this.publicaciones.set(publicaciones);
        this.cargando.set(false);
      },
      error: (error) => {
        this.erroresServidor.set(mensajesDeError(error));
        this.cargando.set(false);
      },
    });
  }
}