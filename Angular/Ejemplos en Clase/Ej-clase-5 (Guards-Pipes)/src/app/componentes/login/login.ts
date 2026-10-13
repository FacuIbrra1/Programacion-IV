import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../servicios/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  username: string = '';
  password: string = '';
  loginError = signal<boolean>(false);

  constructor(private auth: Auth, private router: Router) { }

  login() {

    const ok = this.auth.login(this.username, this.password);

    if (ok) {
      this.username = '';
      this.password = '';
      this.loginError.set(false);
      this.router.navigate(['/bienvenido']);
    } else {
      this.loginError.set(true);
    }

  }
}
