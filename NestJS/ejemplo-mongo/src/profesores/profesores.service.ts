import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto.js';
import { UpdateProfesorDto } from './dto/update-profesor.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Profesor } from './entities/profesor.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class ProfesoresService {

  constructor(@InjectModel(Profesor.name) private readonly profesorModel: Model<Profesor>) {} // Inyección del modelo de Mongoose para la entidad Profesor, profesorModel es una instancia que nos permite interactuar con la base de datos.

  async create(createProfesorDto: CreateProfesorDto) {
    const createdProfesor = await this.profesorModel.create(createProfesorDto); // Se crea una nueva instancia del modelo de Mongoose con los datos del DTO.
    return createdProfesor.save(); // Se guarda el nuevo profesor en la base de datos y se retorna la promesa resultante.
  }

  async findAll() {
    const profesores = await this.profesorModel.find().exec(); // Se buscan todos los documentos de la colección de profesores en la base de datos.
    return profesores; // Se retorna la lista de profesores encontrados.
  }

  async findOne(id: number) {
    const profesor = await this.profesorModel.findById(id).exec(); // Se encuentra el profesor por su ID.
    return profesor; // Se retorna el profesor encontrado.
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    const updatedProfesor = await this.profesorModel.findByIdAndUpdate(id, updateProfesorDto, { upsert: true }).exec(); // Se encuentra y actualiza el profesor por su ID, el upsert: true indica que si no se encuentra el profesor, se creará uno nuevo con los datos proporcionados.
    return updatedProfesor; // Se retorna el profesor actualizado.
  }

  async remove(id: number) {
    const removedProfesor = await this.profesorModel.findByIdAndDelete(id).exec(); // Se encuentra y elimina el profesor por su ID.
    return removedProfesor; // Se retorna el profesor eliminado.
  }
}
