import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Padre } from './componentes/padre/padre';

@Component({
  imports: [RouterOutlet, RouterLink, Padre],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Clase-3');
}
