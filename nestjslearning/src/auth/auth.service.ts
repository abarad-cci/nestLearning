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

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDto): Promise<User> {
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
      delete user.hash;
      return user;
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
    // return user if all ok
    delete user.hash;
    return user;
  }
}
