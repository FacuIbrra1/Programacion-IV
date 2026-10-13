import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from './servicios/auth';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('guards');

  constructor(private auth: Auth) { }

  get isAuthenticated() {
    return this.auth.getCurrentUser();
  }


}
