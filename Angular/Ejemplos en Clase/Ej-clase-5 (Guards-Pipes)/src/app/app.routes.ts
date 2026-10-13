import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { viewGuard } from './guards/view-guard';
import { formGuard } from './guards/form-guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./componentes/login/login').then(m => m.Login)
    },
    {
        path: 'bienvenido',
        loadComponent: () => import('./componentes/bienvenido/bienvenido').then(m => m.Bienvenido),
        canActivate: [authGuard]
    },
    {
        path: 'productos',
        loadComponent: () => import('./componentes/productos/productos').then(m => m.Productos),
        canMatch: [roleGuard],
        canActivateChild: [viewGuard],
        children: [
            {
                path: 'detalle/:id',
                loadComponent: () => import('./componentes/detalle-producto/detalle-producto').then(m => m.DetalleProducto),
                data: { view: 'detalle' }
            }
        ],

    },
    {
        path: 'formulario',
        loadComponent: () => import('./componentes/formulario/formulario').then(m => m.Formulario),
        canDeactivate: [formGuard]
    },
    {
        path: 'registro',
        loadComponent: () => import('./componentes/registro/registro').then(m => m.Registro),
        canDeactivate: [formGuard]
    },
    {
        path: '**',
        loadComponent: () => import('./componentes/productos-error/productos-error').then(m => m.ProductosError),

    }
];
