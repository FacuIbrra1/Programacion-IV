import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateLibroDto } from './dto/create-libro.dto.js';
import { UpdateLibroDto } from './dto/update-libro.dto.js';
import { Libro } from './entities/libro.entity.js';
import { AutorService } from '../autor/autor.service.js';

@Injectable()
export class LibrosService {

  constructor(@InjectModel(Libro.name) private readonly libroModel: Model<Libro>,
    private readonly autorService: AutorService, // Llega porque AutorModule lo exporta.
  ) {}

  async create(createLibroDto: CreateLibroDto) {
    // Guardar un ObjectId NO comprueba que ese autor exista: hay que verificarlo.
    await this.verificarAutor(createLibroDto.autor);

    // create() ya guarda en la base: no hace falta .save().
    // Si no viene el género, el schema pone "Sin genero".
    return this.libroModel.create(createLibroDto);
  }

  async findAll() {
    // populate('autor') reemplaza el ObjectId por el documento completo del autor.
    return this.libroModel.find().populate('autor').exec();
  }

  async findOne(id: Types.ObjectId) {
    const libro = await this.libroModel.findById(id).populate('autor').exec();

    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return libro;
  }

  async update(id: Types.ObjectId, updateLibroDto: UpdateLibroDto) {
    // Solo se verifica si el PATCH trae un autor nuevo.
    if (updateLibroDto.autor) {
      await this.verificarAutor(updateLibroDto.autor);
    }

    const libro = await this.libroModel
      .findByIdAndUpdate(id, updateLibroDto, { returnDocument: 'after', runValidators: true })
      .populate('autor')
      .exec();

    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return libro;
  }

  async remove(id: Types.ObjectId) {
    const libro = await this.libroModel.findByIdAndDelete(id).exec();

    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return libro; // Devuelve el libro que se eliminó.
  }

  // Reutiliza el findOne de AutorService. El DTO ya validó con @IsMongoId
  // que el texto tiene formato de ObjectId, así que la conversión es segura.
  private async verificarAutor(autorId: string) {
    const autor = await this.autorService.findOne(new Types.ObjectId(autorId));

    if (!autor) {
      throw new NotFoundException(`No existe un autor con id ${autorId}`);
    }
  }
}