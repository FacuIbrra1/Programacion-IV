import {Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PublicacionesService } from './publicaciones.service.js';
import { CreatePublicacionDto } from './dto/create-publicacion.dto.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';

// Sprint 2: alta, listado (orden, filtro y paginado), baja lógica y me gusta.
// @UseGuards en la clase: TODAS las rutas de publicaciones piden el token.
@Controller('publicaciones')
@UseGuards(AuthGuard)
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

 // multipart/form-data: título, mensaje y categoría en el body; la imagen (opcional) en "imagen".
  @Post()
  @UseInterceptors(FileInterceptor('imagen', {storage: memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 }}))
  crear(@Body() createPublicacionDto: CreatePublicacionDto, @UploadedFile() imagen: Express.Multer.File | undefined, @Req() request: any) {
    // request.user lo cargó el AuthGuard: el autor es siempre el dueño del token.
    return this.publicacionesService.crear(createPublicacionDto, imagen, request.user.sub);
  }

}