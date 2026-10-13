import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Sirve para validar los datos que se reciben en los DTOs, en este caso, en el CreateAlumnoDto y UpdateAlumnoDto.
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
