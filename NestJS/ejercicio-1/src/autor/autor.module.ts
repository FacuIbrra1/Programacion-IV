import { Module } from '@nestjs/common';
import { AutorService } from './autor.service.js';
import { AutorController } from './autor.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Autor, AutorSchema } from './entities/autor.entity.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Autor.name, schema: AutorSchema }])],
  controllers: [AutorController],
  providers: [AutorService],
  exports: [AutorService],
})
export class AutorModule {}
