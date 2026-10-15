import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AutorModule } from './autor/autor.module.js';
import { LibrosModule } from './libros/libros.module.js';

@Module({
  imports: [AutorModule, LibrosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
