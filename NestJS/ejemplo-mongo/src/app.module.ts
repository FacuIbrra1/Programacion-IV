import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfesoresModule } from './profesores/profesores.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  // MongooseModule.forRoot('mongodb://localhost/nest') sirve para conectarse a una base de datos local de MongoDB.
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!), ProfesoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
