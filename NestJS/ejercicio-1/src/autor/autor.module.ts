import { Module } from '@nestjs/common';
import { AutorService } from './autor.service.js';
import { AutorController } from './autor.controller.js';

@Module({
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}
