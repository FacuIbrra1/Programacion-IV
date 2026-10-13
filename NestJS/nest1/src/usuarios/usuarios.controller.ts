import { Controller, Get, HttpCode, Param, Query, Req } from '@nestjs/common';
import { AppService } from '../app.service.js';
import { UsuariosService } from './usuarios.service.js';

@Controller('usuarios') // Va a manejar todas las rutas que se definan en el controlador.
export class UsuariosController {
  constructor(private readonly UsuariosService: UsuariosService) {}

  // Decorador que indica a que metodo va a responde la ruta que se defina en el controlador. En este caso, la ruta es la raiz del proyecto.
  @Get()
  devolverHola(): string {
    return this.UsuariosService.getHello();
  }

  @Get('todos') // Va a manejar la ruta /usuarios/todos
  getTodos(): string {
    return this.UsuariosService.getTodos();
  }

  @Get(':id') // Va a manejar la ruta /usuarios/:id ---> se le pasa por parametro de la url el id del usuario que se quiere obtener.
  traerUno(@Param('id') id: string): any {
    return this.UsuariosService.getUno(id);
  }

  @Get('request/:id') // Va a manejar la ruta /usuarios/request/:id ---> se le pasa por parametro de la url el id del usuario que se quiere obtener.
  @HttpCode(204) // Sirve para devolver un código de estado HTTP diferente al 200, en este caso, el 204.
  traerRequest(@Req() req: Request): string {
    return this.UsuariosService.getRequest(req);
  }

  @Get('todos') // Va a manejar la ruta /usuarios/todos
  traerTodos(@Query() query: any): string {
    console.log(query);
    return this.UsuariosService.traerTodos();
  }
}
