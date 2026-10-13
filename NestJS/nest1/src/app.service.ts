import { Injectable } from '@nestjs/common';

//Se maneja igual que el Servicio de Angular.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}
