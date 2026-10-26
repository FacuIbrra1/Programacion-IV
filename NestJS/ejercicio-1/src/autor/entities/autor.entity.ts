import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutorDocument = HydratedDocument<Autor>;

// toJSON / toObject con virtuals: sin esto, el campo virtual "libros"
// existe pero NO aparece en la respuesta JSON de la API.
@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Autor {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  apellido: string;

  // unique: crea un índice en Mongo, no permite dos autores con el mismo mail.
  @Prop({ required: true, unique: true, trim: true })
  mail: string;
}

export const AutorSchema = SchemaFactory.createForClass(Autor);
AutorSchema.virtual('libros', { ref: 'Libro', localField: '_id', foreignField: 'autor' });

// "Libros asociados": NO se guarda en el documento del autor.
// Mongoose lo resuelve al consultar, buscando los libros cuyo campo
// `autor` sea igual al `_id` de este autor (virtual populate).
AutorSchema.virtual('libros', {
  ref: 'Libro',          // nombre del modelo de libros
  localField: '_id',     // campo de ESTE documento (autor)
  foreignField: 'autor', // campo del OTRO documento (libro)
});