import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Injectable()
export class CarrerasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.carrera.findMany();
  }

  async create(data: CreateCarreraDto) {
    return this.prisma.carrera.create({ data });
  }
}
