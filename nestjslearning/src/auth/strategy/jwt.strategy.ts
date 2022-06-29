import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    // function extracts info from token and appends it to request.user
    // console.log({ payload });

    //validate if( user from token data = user from db )
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    // console.log(user);
    // if (!user) return null;
    delete user.hash;
    return user; // if user === null it will throw unauthorized
  }
}
