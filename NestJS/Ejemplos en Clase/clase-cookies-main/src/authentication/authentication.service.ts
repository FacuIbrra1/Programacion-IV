import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './usuario.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(@InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
                private readonly jwtService: JwtService) {}

    async register(createUserDto: CreateUserDto) {

      // En un caso real, deberíamos usar bcrypt o similar para hashear la contraseña
        const nuevoUsuario = await this.usuarioModel.create(createUserDto);

        if (!nuevoUsuario) {
            throw new Error('Error al crear el usuario');
        }
        
        const payload = { 
            sub: nuevoUsuario._id,
            email: nuevoUsuario.email, 
            name: nuevoUsuario.name 
        };

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }

   async login(loginUser: {email: string, password: string}) {
    const usuario = await this.usuarioModel.findOne({ email: loginUser.email });


    if(!usuario ||usuario.password !== loginUser.password) {
      throw new Error('Credenciales inválidas');
    }

    const payload = { 
      sub: usuario._id,
      email: usuario.email, 
      name: usuario.name 
    };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
   }


   async getProfile(userId: string) {
    return await this.usuarioModel.findById(userId).select('-password');
   }
}
