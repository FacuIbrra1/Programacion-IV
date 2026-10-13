import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../servicios/models/user';

@Component({
  imports: [],
  selector: 'app-user-card',
  styleUrl: './user-card.css',
  templateUrl: './user-card.html',
})
export class UserCard {
  @Input() user!: User; // !: indica que el valor de user es obligatorio y tiene que estar definido.
  @Output() userSelected = new EventEmitter<User>(); // Evento que se dispara cuando el usuario hace click en el botón de seleccionar usuario.

}
