import { Module } from '@nestjs/common';
import { ProfesoresService } from './profesores.service.js';
import { ProfesoresController } from './profesores.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Profesor, ProfesorSchema } from './entities/profesor.entity.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Profesor.name, schema: ProfesorSchema }])],
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
})
export class ProfesoresModule {}
