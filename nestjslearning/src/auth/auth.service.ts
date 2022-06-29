import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: AuthDto): Promise<{ access_token: string }> {
    try {
      // generate hash
      const hash = await argon.hash(dto.password);

      // create user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });
      // return user
      const token = await this.signToken(user.id, user.email);
      return token;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          //duplicate unique field violation error code
          throw new ForbiddenException('Email already exists !!! ');
      }

      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    // console.log(typeof dto.email);
    //find user by email

    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    // if user doesnot exist then throw exception
    if (!user)
      throw new NotFoundException(`User with email: ${dto.email} Not found!`);
    //compare password matches
    const check = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!check) throw new ForbiddenException('Password is incorrect !');
    // return token if user is valid
    const token = await this.signToken(user.id, user.email);

    return token;
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email: email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: '60m',
    });

    return { access_token: token };
  }
}
