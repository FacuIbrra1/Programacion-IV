import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { AlumnoModule } from './alumno/alumno.module.js';

@Module({
  imports: [UsuariosModule, AlumnoModule], // Va a importar los modulos que se van a utilizar en la  app.
  controllers: [AppController], // Va a manejar cada una de las rutas que se definan en el controlador.
  providers: [AppService], // va a manejar la lógica de negocio de la aplicación, es decir, va a contener los servicios que se van a utilizar en los controladores.
})
export class AppModule {}
