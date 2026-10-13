import { Injectable } from '@nestjs/common';
import { AlumnoService } from '../alumno/alumno.service.js';

//Se maneja igual que el Servicio de Angular.
@Injectable()
export class UsuariosService {
  
  constructor(private readonly alumnoService: AlumnoService) {}

  getHello(): string {
    return 'Hello World!';
  }


  getTodos(): string {
    return 'Todos los usuarios';
  }

  getUno(id: string): any {
    const datosAlumno = this.alumnoService.getInformation(Number(id));
    return {
      id: id,
      datosAlumno: datosAlumno
    };
  }

  getRequest(req: Request): string {
    console.log(req);
    return `Request recibido: ${req.method} ${req.url}`;
  }

  traerTodos(): string {
    return 'Todos los usuarios con query params';
  }
}