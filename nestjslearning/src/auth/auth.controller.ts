import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Req() req: Request) {
    console.log(req.body);
    return this.authService.signIn();
  }
  @Post('signup')
  signUp() {
    return this.authService.signUp();
  }
}
