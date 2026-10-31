import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from '../file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { memoryStorage } from 'multer';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto', { storage: memoryStorage() }))
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createUsuarioDto.foto = await this.fileService.cloudinaryUploader(file);
    }

    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
