import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pagina-uno',
        loadComponent: () => import('./componentes/pagina-uno/pagina-uno').then(m => m.PaginaUno)
    },
    {
        path: 'pagina-dos',
        loadComponent: () => import('./componentes/pagina-dos/pagina-dos').then(m => m.PaginaDos)
    }
];
