import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service.js';
import { LibrosController } from './libros.controller.js';

@Module({
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
