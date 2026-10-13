import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio';
import { SobreNosotros } from './componentes/sobre-nosotros/sobre-nosotros';
import { Items } from './componentes/items/items';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        component: Inicio
    },
    {
        path: 'sobre-nosotros',
        component: SobreNosotros
    },
    {
        path: 'items',
        component: Items,
        children: [{path: 'detalle/:id', loadComponent: () => import('./componentes/detalle/detalle').then((m) => m.Detalle)}]
    },
    {
        path: 'error',
        loadComponent: () => import('./componentes/error/error').then((m) => m.Error) // Solo se va a llamar cuando se acceda a la ruta error, se la llama como carga en demanda.
    },
    {
        path: '**',
        redirectTo: 'error'
    }
];
