import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.estudiante.findMany({
        skip,
        take: limit,
        include: { carrera: true, ciclo: true, matriculas: true }
      }),
      this.prisma.estudiante.count()
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: number) {
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { id_Estudiante: id },
      include: { carrera: true, ciclo: true, matriculas: true }
    });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }

    return estudiante;
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

  async update(id: number, data: UpdateEstudianteDto) {
    await this.findOne(id);

    const updateData: any = {};
    if (data.nombre) updateData.nombre = data.nombre;
    if (data.apellido) updateData.apellido = data.apellido;
    if (data.cedula) updateData.cedula = data.cedula;
    if (data.email) updateData.email = data.email;
    if (data.telefono) updateData.telefono = data.telefono;
    if (data.carreraId) updateData.carrera = { connect: { id_Carrera: data.carreraId } };
    if (data.cicloId) updateData.ciclo = { connect: { id_Ciclo: data.cicloId } };

    return this.prisma.estudiante.update({
      where: { id_Estudiante: id },
      data: updateData
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.estudiante.delete({
      where: { id_Estudiante: id }
    });
  }
}
