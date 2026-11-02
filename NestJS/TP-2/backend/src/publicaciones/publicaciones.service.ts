import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Publicacion } from './entities/publicacion.entity.js';
import { CreatePublicacionDto } from './dto/create-publicacion.dto.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';

// Los datos del autor que se muestran con cada publicación (nunca la contraseña ni el correo).
const DATOS_AUTOR = 'nombre apellido username imagenUrl tipo';

// Sprint 2: acá va la lógica de las publicaciones.
@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name)
    private readonly publicacionModel: Model<Publicacion>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ---- CREAR ----
  async crear(
    createPublicacionDto: CreatePublicacionDto,
    imagen: Express.Multer.File | undefined,
    autorId: Types.ObjectId) {

    // La imagen es opcional. Si viene, tiene que ser una imagen y se sube a Cloudinary.
    let imagenUrl = '';
    if (imagen) {
      if (!imagen.mimetype.startsWith('image/')) {
        throw new BadRequestException('El archivo tiene que ser una imagen');
      }

      imagenUrl = await this.cloudinaryService.subirImagen(imagen,'potrero-libre/publicaciones',);
    }

    const nuevaPublicacion = await this.publicacionModel.create({
      titulo: createPublicacionDto.titulo,
      mensaje: createPublicacionDto.mensaje,
      categoria: createPublicacionDto.categoria, // Si no vino, Mongoose pone 'general'.
      imagenUrl: imagenUrl,
      autor: autorId,
    });

    // Se devuelve con los datos del autor, igual que la va a mostrar el listado.
    return await this.publicacionModel.findById(nuevaPublicacion._id).populate('autor', DATOS_AUTOR)}
    
}