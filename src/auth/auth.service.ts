import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Correo o contraseña inválidos');
    }

    return {
        access_token: await this.jwtService.signAsync({ 
            sub: user.id,
            email: user.email
        }),
    };
  }
}