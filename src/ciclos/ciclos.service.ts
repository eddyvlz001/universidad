import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCicloDto } from './dto/create-ciclo.dto';

@Injectable()
export class CiclosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ciclo.findMany({ include: { estudiantes: true, materias: true } });
  }

  async create(data: CreateCicloDto) {
    return this.prisma.ciclo.create({
      data: {
        numero_Ciclo: data.numero_Ciclo,
        periodo: data.periodo,
        carrera: { connect: { id_Carrera: data.carreraId } }
      }
    });
  }
}
