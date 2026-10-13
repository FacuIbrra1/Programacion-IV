import { Component, signal, inject } from '@angular/core';
import { Router,RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Clase-2');

  router = inject(Router);
  //constructor(private router: Router){}

  active = "active";

  navegar(ruta: string){
    this.router.navigate([ruta]);
    //this.router.navigateByUrl(ruta);
  }
}
