import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MiModuloModule } from './modulos/mi-modulo/mi-modulo-module';

@Component({
  imports: [FormsModule, MiModuloModule, RouterModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  miDato: string = '';
  protected readonly title = signal('modulos');
}
