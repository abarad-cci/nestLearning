import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn() {
    return { action: 'sign in ' };
  }
  signUp() {
    return { action: 'signup' };
  }
}
