import { Injectable } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto.js';
import { UpdateAutorDto } from './dto/update-autor.dto.js';
import { Autor } from './entities/autor.entity.js';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AutorService {

  constructor(@InjectModel(Autor.name) private readonly autorModel: Model<Autor>) {}

  async create(createAutorDto: CreateAutorDto) {
    const autor = await this.autorModel.create(createAutorDto);
    return autor.save();
  }

  async findAll() {
    const autores = await this.autorModel.find().populate('libros').exec(); // Se buscan todos los documentos de la colección de autores en la base de datos.
    return autores; // Se retorna la lista de autores encontrados.
  }

  async findOne(id: Types.ObjectId) {
    const autor = await this.autorModel.findById(id).populate('libros').exec(); // polulate('libros) indica que se quiere traer los libros asociados a este autor, usando el virtual populate definido en el esquema del autor.
    return autor;
  }

  async update(id: Types.ObjectId, updateAutorDto: UpdateAutorDto) {
    const updatedAutor = await this.autorModel.findByIdAndUpdate(id, updateAutorDto, { returnDocument: 'after', runValidators: true }).exec(); // Se encuentra y actualiza el autor por su ID, el upsert: true indica que si no se encuentra el autor, se creará uno nuevo con los datos proporcionados.
    return updatedAutor; // Se retorna el autor actualizado.
  }
}
