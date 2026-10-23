import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Usuario {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;
}
export const usuarioSchema = SchemaFactory.createForClass(Usuario);