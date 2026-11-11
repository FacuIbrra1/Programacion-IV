import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comentario } from './entities/comentario.entity.js';
import { DATOS_AUTOR, PublicacionesService } from './publicaciones.service.js';
import { ListarComentariosDto } from './dto/listar-comentarios.dto.js';

// Sprint 2: traer los comentarios de una publicación (Mi Perfil los muestra).
// Sprint 3: paginarlos, agregar nuevos y editarlos.
@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario.name)
    private readonly comentarioModel: Model<Comentario>,
    // Otro servicio del mismo módulo, para reusar el control de "la publicación existe".
    private readonly publicacionesService: PublicacionesService,
  ) {}

  // ---- LISTAR ----
  async listar(publicacionId: Types.ObjectId, paginado: ListarComentariosDto) {
    // Igual que en el listado de publicaciones: si no vienen, desde el primero y de a 10.
    const offset = Number(paginado.offset ?? 0);
    const limit = Number(paginado.limit ?? 10);
    if (limit < 1 || limit > 50) {
      throw new BadRequestException('El limit tiene que estar entre 1 y 50');
    }

    // 404 si la publicación no existe o está dada de baja (el mismo control que borrar y los me gusta).
    await this.publicacionesService.buscarPublicacionActiva(publicacionId);

    return await this.comentarioModel
      .find({ publicacion: publicacionId })
      .sort('-fecha') // Los más recientes primero (lo pide el enunciado).
      .skip(offset) // Se saltea los de las páginas anteriores.
      .limit(limit) // Trae como máximo "limit".
      .populate('autor', DATOS_AUTOR); // Quién comentó, con los mismos datos que el autor de una publicación.
  }
}