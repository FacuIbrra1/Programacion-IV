import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { FileService } from '../file/file.service';


@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [UsuarioService, FileService],
})
export class UsuarioModule {}
