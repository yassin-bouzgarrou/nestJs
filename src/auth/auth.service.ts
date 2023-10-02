import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/auth.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
//bussnies logique and connect to the database
@Injectable({})
export class AuthServie {
  constructor(
    private prisma: PrismaService,
    private Jwt: JwtService,
    private congif : ConfigService
  ) {}
  async singup(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id , user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
      }
    }
  }

  async signin(dto: CreateUserDto) {
    const Finduser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!Finduser) throw new ForbiddenException('no user found');
    const CeckPassword = await argon.verify(Finduser.hash, dto.password);
    if (!CeckPassword) throw new ForbiddenException('password incorect');

    return this.signToken(Finduser.id, Finduser.email);
  }


  
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };


    const token = await this.Jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: "super-secret",
      },
    );

    return {
      access_token: token,
    };
  }
  
}
