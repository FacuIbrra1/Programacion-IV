import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ComentariosService } from './comentarios.service.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { ListarComentariosDto } from './dto/listar-comentarios.dto.js';

// El "comentarios controller" que pide el enunciado, dentro del módulo publicaciones.
// Sin prefijo en @Controller(): el GET y el POST van en /publicaciones/:id/comentarios y el PUT (Sprint 3) en /comentarios/:id.
@Controller()
@UseGuards(AuthGuard)
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  // GET /publicaciones/:id/comentarios?offset=0&limit=5 → los comentarios de una publicación,
  // los más recientes primero y paginados (como el listado de publicaciones).
  @Get('publicaciones/:id/comentarios')
  listar(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Query() paginado: ListarComentariosDto) {
    return this.comentariosService.listar(id, paginado);
  }
}