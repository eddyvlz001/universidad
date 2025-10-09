import { Module } from '@nestjs/common';
import { CiclosController } from './ciclos.controller';
import { CiclosService } from './ciclos.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CiclosController],
  providers: [CiclosService, PrismaService],
})
export class CiclosModule {}
