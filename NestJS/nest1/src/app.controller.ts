import { Controller, Get, HttpCode, Param, Req } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller() // Va a manejar todas las rutas que se definan en el controlador.
export class AppController {
  constructor(private readonly appService: AppService) {}
}
