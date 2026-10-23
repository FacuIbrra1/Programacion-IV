import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './create-user-dto';
import { AuthGuard } from '../guards/auth/auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, 
  @Res({passthrough: true}) res: Response) {
    const resultado = await this.authenticationService.register(createUserDto);
    this.setTokenCookie(res, resultado.access_token);
    return { message: 'usuario registrado exitosamente' };
  }

  @Post('login')
  async login(
    @Body() loginUser: {email: string, password: string},
    @Res({ passthrough: true }) res: Response // 💡 Inyectamos la respuesta con passthrough
  ) {
    const result = await this.authenticationService.login(loginUser);
    // Seteamos la cookie de forma segura
    this.setTokenCookie(res, result.access_token);
    return { message: 'Login exitoso' };
  }

  @UseGuards(AuthGuard)
  @Get('profile/:userId')
  async getProfile(@Param('userId') userId: string) {
    return this.authenticationService.getProfile(userId);
  }

  private setTokenCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true, 
      sameSite: 'strict',
      secure: true, 
      maxAge: 1000 * 60 * 2, // Sincronizacion de 60s con la exp del JWT token
    });
  }

}
