import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Autor } from '../../autor/entities/autor.entity.js';

export type LibroDocument = HydratedDocument<Libro>;

@Schema()
export class Libro {
  @Prop({ required: true, trim: true })
  nombre: string;

  // Si el cliente no manda el género, Mongoose guarda este valor.
  @Prop({ default: 'Sin genero', trim: true })
  genero: string;

  // Referencia al autor: se guarda solo su _id (ObjectId).
  // `ref` le dice a populate() en qué colección buscarlo.
  @Prop({ type: Types.ObjectId, ref: Autor.name, required: true })
  autor: Types.ObjectId;
}

export const LibroSchema = SchemaFactory.createForClass(Libro);