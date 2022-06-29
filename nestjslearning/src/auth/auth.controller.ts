import { Body, Controller, Post, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
  @Post('signup')
  async signUp(@Body() dto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.signUp(dto);
  }
}
