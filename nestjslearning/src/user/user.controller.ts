import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { request } from 'http';
import { userInfo } from 'os';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt')) // simply means protect this route by the jwt strategy
  @Get('me')
  async getProfile(@Req() req: Request) {
    // console.log({ request: req.user });
    return req.user;
  }
}
