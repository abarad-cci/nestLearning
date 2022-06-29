import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { request } from 'http';
import { userInfo } from 'os';
import { GetUser } from 'src/auth/decorator';

import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard) // simply means protect this route by the jwt strategy
// putting a guard on top of a controller means all routes inside will use the guard
@Controller('users')
export class UserController {
  @Get('me')
  async getProfile(@GetUser() user: User, @GetUser('email') email: string) {
    //console.log(email);
    return user;
  }
}
