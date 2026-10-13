import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service.js';
import { AlumnoController } from './alumno.controller.js';

@Module({
  controllers: [AlumnoController],
  providers: [AlumnoService],
  exports: [AlumnoService] // Exporta el servicio para que pueda ser utilizado en otros módulos.
})
export class AlumnoModule {}
