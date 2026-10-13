// la entidad sirve para defenir la estuctura de la tabla en la base de datos, es decir, los campos que va a tener la tabla y sus tipos de datos.
export class Alumno {
    id: number;
    nombre: string;
    apellido: string;
    legajo: number;
    materias: Materia[];
}

export interface Materia {
    id: number;
    nombre: string;
}