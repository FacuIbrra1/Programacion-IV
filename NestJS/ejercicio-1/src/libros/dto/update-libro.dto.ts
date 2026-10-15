import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto.js';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {}
