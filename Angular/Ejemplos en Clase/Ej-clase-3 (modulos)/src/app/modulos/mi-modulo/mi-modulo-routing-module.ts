import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaModulo } from './pagina-modulo/pagina-modulo';

const routes: Routes = [{
  path: 'pagina',
  component: PaginaModulo,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiModuloRoutingModule {}
