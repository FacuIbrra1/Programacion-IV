import { Component, signal } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';
import { RouterLink, Router } from '@angular/router';
import { LoginData } from '../../models/login-data';
import { Auth } from '../../services/auth';


@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  // Esto es un formulario reactivo usando signals y validaciones de Angular.
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
    required(schemaPath.password, {message: 'Password is required'});
  });

  constructor(private auth: Auth, private router: Router) {}

  // Utilizamos un metodo asincrono para manejar el evento de submit del formulario de login.
  async onSubmit(event: Event) {
    event.preventDefault();
    // Perform login logic here
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);
    // Esperamos a que la promesa de signIn se resuelva y luego verificamos si hubo un error o no.
    const result = await this.auth.signIn(credentials.email, credentials.password);

    if (result.error) {
      console.error('Login failed:', result.error);
      return;
    }
    console.log('Login successful:', result.data);
    this.router.navigate(['/cosas']);
  }

}
