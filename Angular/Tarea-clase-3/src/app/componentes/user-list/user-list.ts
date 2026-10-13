import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UserService } from '../../servicios/user-service';
import { User } from '../../servicios/models/user';
import { Subscription } from 'rxjs';
import { UserCard } from '../user-card/user-card';

@Component({
  imports: [UserCard],
  selector: 'app-user-list',
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})

export class UserList implements OnInit, OnDestroy {
  private readonly userService = inject(UserService);
  usuarios = signal<User[]>([]);
  suscription: Subscription | undefined;
  usuarioSeleccionado = signal<User | undefined>(undefined);

  metodoSeleccionado(user: User): void {
    this.usuarioSeleccionado.set(user);
  }

  ngOnInit(): void {
  this.suscription = this.userService.getUsers()
    .subscribe({
      next: (data: User[]) => {
        console.log("Datos recibidos:", data);
        this.usuarios.set(data);
      },
      error: (error) => {
        console.error("Error al obtener los datos:", error);
      },
      complete: () => {
        console.log("Solicitud completada");
      }
      
    });
  }

  ngOnDestroy(): void {
  this.suscription?.unsubscribe();
  console.log("UserList: ngOnDestroy - Suscripción cancelada");
}

}
