import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutorService } from './autor.service.js';
import { CreateAutorDto } from './dto/create-autor.dto.js';
import { UpdateAutorDto } from './dto/update-autor.dto.js';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autorService.create(createAutorDto);
  }

  @Get()
  findAll() {
    return this.autorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.autorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() updateAutorDto: UpdateAutorDto) {
    return this.autorService.update(id, updateAutorDto);
  }

}
