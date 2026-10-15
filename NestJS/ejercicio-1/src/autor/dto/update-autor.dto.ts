import { PartialType } from '@nestjs/mapped-types';
import { CreateAutorDto } from './create-autor.dto.js';

export class UpdateAutorDto extends PartialType(CreateAutorDto) {}
