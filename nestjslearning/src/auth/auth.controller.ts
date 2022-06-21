import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    console.log(dto.email, dto.password);
    console.log({ dto });
    return this.authService.signIn();
  }
  @Post('signup')
  signUp() {
    return this.authService.signUp();
  }
}
