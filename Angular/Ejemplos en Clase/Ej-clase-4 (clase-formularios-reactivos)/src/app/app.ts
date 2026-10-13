import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PerfilUsuario } from './perfil-usuario/perfil-usuario';

@Component({
  imports: [RouterOutlet, PerfilUsuario],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('clase-formularios');
}
