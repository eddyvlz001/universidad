import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocenteDto } from './dto/create-docente.dto';

@Injectable()
export class DocentesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.docente.findMany({ include: { materias: true } });
  }

  async create(data: CreateDocenteDto) {
    return this.prisma.docente.create({ data });
  }
}
