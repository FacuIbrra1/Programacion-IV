import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Publicacion } from './entities/publicacion.entity.js';
import { CreatePublicacionDto } from './dto/create-publicacion.dto.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
import { ListarPublicacionesDto } from './dto/listar-publicaciones.dto.js';

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


    
  // ---- LISTAR ----
  async listar(filtros: ListarPublicacionesDto) {
    // Los números llegan como texto en la URL. Si no vienen: desde la primera, de a 10.
    const offset = Number(filtros.offset ?? 0);
    const limit = Number(filtros.limit ?? 10);
    if (limit < 1 || limit > 50) {
      throw new BadRequestException('El limit tiene que estar entre 1 y 50');
    }

    // Qué publicaciones traer: nunca las dadas de baja, y los filtros que hayan llegado.
    const condiciones: any = { activa: true };
    if (filtros.usuario) {
      condiciones.autor = filtros.usuario;
    }
    if (filtros.categoria) {
      condiciones.categoria = filtros.categoria;
    }

    // Mismo formato que .select('-password'): campos separados por espacio.
    // En sort, el "-" significa de mayor a menor.
    // Por me gusta: las de más me gusta primero y, si empatan, la más nueva.
    const orden =
      filtros.orden === 'likes' ? '-cantidadLikes -fecha' : '-fecha';

    return await this.publicacionModel
      .find(condiciones)
      .sort(orden) // Ordena.
      .skip(offset) // Se saltea las primeras "offset" (las de las páginas anteriores).
      .limit(limit) // Trae como máximo "limit".
      .populate('autor', DATOS_AUTOR);
  }


  // ---- BORRAR (baja lógica) ----
  async borrar(id: Types.ObjectId, usuarioId: string, perfil: string) {
    const publicacion = await this.publicacionModel.findById(id);

    // 404: no existe, o ya estaba dada de baja (para el usuario es lo mismo: no está).
    if (!publicacion || !publicacion.activa) {
      throw new NotFoundException('La publicación no existe');
    }

    // 403: solo la puede borrar quien la publicó o un administrador.
    // autor es un ObjectId y usuarioId es texto (viene del token): se comparan como texto.
    const esAutor = publicacion.autor.toString() === usuarioId;
    const esAdministrador = perfil === 'administrador';
    if (!esAutor && !esAdministrador) {
      throw new ForbiddenException('Solo podés borrar tus publicaciones');
    }

    // Baja lógica: queda en la base, pero el listado ya no la muestra.
    publicacion.activa = false;
    await publicacion.save();

    return { message: 'Publicación eliminada' };
  }
    
}