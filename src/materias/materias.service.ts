import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.materia.findMany({ include: { docente: true, ciclo: true } });
  }

  async create(data: CreateMateriaDto) {
    return this.prisma.materia.create({
      data: {
        nombre_Materia: data.nombre_Materia,
        creditos: data.creditos,
        docente: { connect: { id_docente: data.docenteId } },
        ciclo: { connect: { id_Ciclo: data.cicloId } }
      }
    });
  }
}
