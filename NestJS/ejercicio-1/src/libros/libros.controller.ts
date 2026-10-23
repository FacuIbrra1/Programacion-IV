import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { LibrosService } from './libros.service.js';
import { CreateLibroDto } from './dto/create-libro.dto.js';
import { UpdateLibroDto } from './dto/update-libro.dto.js';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post() // POST http://localhost:3000/libros
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.librosService.create(createLibroDto);
  }

  @Get() // GET http://localhost:3000/libros
  findAll() {
    return this.librosService.findAll();
  }

  @Get(':id') // GET http://localhost:3000/libros/:id
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.librosService.findOne(id);
  }

  @Patch(':id') // PATCH http://localhost:3000/libros/:id
  update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() updateLibroDto: UpdateLibroDto) {
    return this.librosService.update(id, updateLibroDto);
  }

  @Delete(':id') // DELETE http://localhost:3000/libros/:id
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.librosService.remove(id);
  }
}