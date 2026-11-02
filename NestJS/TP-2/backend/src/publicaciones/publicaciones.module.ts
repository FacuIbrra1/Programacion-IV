import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicacionesService } from './publicaciones.service.js';
import { PublicacionesController } from './publicaciones.controller.js';
import {Publicacion, PublicacionSchema} from './entities/publicacion.entity.js';
import { Like, LikeSchema } from './entities/like.entity.js';
import { Comentario, ComentarioSchema } from './entities/comentario.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publicacion.name, schema: PublicacionSchema },
      { name: Like.name, schema: LikeSchema },
      { name: Comentario.name, schema: ComentarioSchema },
    ])
  ],
  controllers: [PublicacionesController],
  providers: [PublicacionesService]
})

export class PublicacionesModule {}