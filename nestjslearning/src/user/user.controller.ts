import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('me')
  async getProfile() {
    return 'this is user profile';
  }
}
