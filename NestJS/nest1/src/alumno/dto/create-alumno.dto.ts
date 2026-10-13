import { IsInt, IsNotEmpty, IsString } from "class-validator";

// Un DTO (Data Transfer Object) se utiliza para definir la estructura de los datos que se van a transferir entre el cliente y el servidor. En este caso, se define un DTO para crear un alumno.
export class CreateAlumnoDto {
    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString({ each: true })
    materias: number[];
    
    @IsNotEmpty()
    @IsInt({message: 'El legajo debe ser un número entero'})
    legajo: number;
}
