import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.estudiante.findMany({
      include: { carrera: true, ciclo: true }
    });
  }

  async create(data: CreateEstudianteDto) {
    return this.prisma.estudiante.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        email: data.email,
        telefono: data.telefono,
        carrera: { connect: { id_Carrera: data.carreraId } },
        ciclo: { connect: { id_Ciclo: data.cicloId } }
      }
    });
  }
}
