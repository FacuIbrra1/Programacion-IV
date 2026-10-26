import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, // Sirve para descartar los campos que no están en el DTO.
      forbidNonWhitelisted: true, // Sirve para que, en lugar de descartarlos, la petición se rechace con un 400.
      transform: true // Sirve para transformar los tipos de los campos a los tipos que se esperan en el DTO.
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
