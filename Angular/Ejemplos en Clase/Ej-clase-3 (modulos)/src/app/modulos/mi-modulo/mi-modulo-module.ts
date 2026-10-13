import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiModuloRoutingModule } from './mi-modulo-routing-module';
import { ComponenteModularizado } from './componente-modularizado/componente-modularizado';
import { FormsModule } from '@angular/forms';
import { PaginaModulo } from './pagina-modulo/pagina-modulo';

@NgModule({
  declarations: [ComponenteModularizado, PaginaModulo],
  imports: [CommonModule, MiModuloRoutingModule, FormsModule],
  exports: [ComponenteModularizado, PaginaModulo],
})
export class MiModuloModule {}
