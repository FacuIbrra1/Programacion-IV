import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LibrosService } from './libros.service.js';
import { LibrosController } from './libros.controller.js';
import { Libro, LibroSchema } from './entities/libro.entity.js';
import { AutorModule } from '../autor/autor.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Libro.name, schema: LibroSchema }]),
    AutorModule, // Para poder inyectar AutorService en LibrosService.
  ],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}