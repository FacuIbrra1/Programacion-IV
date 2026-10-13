import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'modulo',
    loadChildren: () => import('./modulos/mi-modulo/mi-modulo-module').then(m => m.MiModuloModule),
  },
];
