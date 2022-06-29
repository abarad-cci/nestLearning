import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { request } from 'http';
import { userInfo } from 'os';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard) // simply means protect this route by the jwt strategy
  @Get('me')
  async getProfile(@Req() req: Request) {
    // console.log({ request: req.user });
    return req.user;
  }
}
