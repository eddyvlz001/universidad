import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCicloDto } from './dto/create-ciclo.dto';
import { UpdateCicloDto } from './dto/update-ciclo.dto';

@Injectable()
export class CiclosService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.ciclo.findMany({
        skip,
        take: limit,
        include: { estudiantes: true, materias: true, carrera: true }
      }),
      this.prisma.ciclo.count()
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
    const ciclo = await this.prisma.ciclo.findUnique({
      where: { id_Ciclo: id },
      include: { estudiantes: true, materias: true, carrera: true }
    });

    if (!ciclo) {
      throw new NotFoundException(`Ciclo con ID ${id} no encontrado`);
    }

    return ciclo;
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

  async update(id: number, data: UpdateCicloDto) {
    await this.findOne(id);

    const updateData: any = {};
    if (data.numero_Ciclo !== undefined) updateData.numero_Ciclo = data.numero_Ciclo;
    if (data.periodo) updateData.periodo = data.periodo;
    if (data.carreraId) updateData.carrera = { connect: { id_Carrera: data.carreraId } };

    return this.prisma.ciclo.update({
      where: { id_Ciclo: id },
      data: updateData
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.ciclo.delete({
      where: { id_Ciclo: id }
    });
  }
}
