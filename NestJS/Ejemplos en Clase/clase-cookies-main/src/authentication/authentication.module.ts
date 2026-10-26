import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, usuarioSchema } from './usuario.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      JwtModule.register({
      global: true,
      secret: "MiSuperClaveSecreta2026VamosPorLa4ta",
      signOptions: { expiresIn: '2m' },
    }),
    MongooseModule.forFeature([{ name: Usuario.name, schema: usuarioSchema }])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
