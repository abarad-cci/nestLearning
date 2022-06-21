import { PrismaClient } from '.pnpm/@prisma+client@3.15.2_prisma@3.15.2/node_modules/.prisma/client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // injected from configModule

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
   // console.log(config.get('DATABASE_URL')); // getter function on config to get variable from .env file
  }
}
