import { Component } from '@angular/core';
import { Padre } from './padre/padre/padre';

@Component({
  imports: [Padre],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {

}
