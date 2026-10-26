import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAutorDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;
    
    @IsEmail()
    @IsNotEmpty()
    mail: string;
}
