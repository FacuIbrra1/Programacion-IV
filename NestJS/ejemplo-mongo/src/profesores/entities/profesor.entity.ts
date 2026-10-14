import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema() // Decorador para indicar que esta clase es un esquema de Mongoose.
export class Profesor {
    @Prop({required: true, default: 'sin nombre'}) // Decorador para indicar que esta propiedad es un campo del esquema de Mongoose.
    nombre: string;
    @Prop({required: true, default: 'sin apellido'})
    apellido: string;
    @Prop({required: true, default: 'sin mail'})
    email: string;
}

export const ProfesorSchema = SchemaFactory.createForClass(Profesor); // Se crea el esquema de Mongoose a partir de la clase Profesor.
