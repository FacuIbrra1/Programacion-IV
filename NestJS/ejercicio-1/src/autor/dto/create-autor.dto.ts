import { IsEmail, IsEmpty, IsString } from "class-validator";

export class CreateAutorDto {
    @IsString()
    @IsEmpty()
    nombre: string;

    @IsString()
    @IsEmpty()
    apellido: string;
    
    @IsEmail()
    mail: string;
}
