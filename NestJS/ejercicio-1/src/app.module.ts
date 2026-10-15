import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Autor, AutorSchema } from './autor/entities/autor.entity.js';
import { AutorModule } from './autor/autor.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI!), 
    MongooseModule.forFeature([
      { name: Autor.name, 
        schema: AutorSchema 
      }]),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
