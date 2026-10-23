import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLibroDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    genero: string;

    @IsMongoId()
    autor: string;
}
