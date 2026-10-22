import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutorService } from './autor.service.js';
import { CreateAutorDto } from './dto/create-autor.dto.js';
import { UpdateAutorDto } from './dto/update-autor.dto.js';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post() // Usar http://localhost:3000/autor para crear un autor
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autorService.create(createAutorDto);
  }

  @Get() // Usar http://localhost:3000/autor para obtener todos los autores
  findAll() {
    return this.autorService.findAll();
  }

  @Get(':id') // Usar http://localhost:3000/autor/:id para obtener un autor específico
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.autorService.findOne(id);
  }

  @Patch(':id') // Usar http://localhost:3000/autor/:id para actualizar un autor específico
  update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() updateAutorDto: UpdateAutorDto) {
    return this.autorService.update(id, updateAutorDto);
  }

}
