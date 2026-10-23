import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AutorModule } from './autor/autor.module.js';
import { LibrosModule } from './libros/libros.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI!), 
    AutorModule,
    LibrosModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
