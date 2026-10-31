import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Usuario {
    @Prop()
    nombre: string;

    @Prop()
    email: string;

    @Prop()
    foto: string;

}
