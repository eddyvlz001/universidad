import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.materia.findMany({
        skip,
        take: limit,
        include: { docente: true, ciclo: true, matriculas: true }
      }),
      this.prisma.materia.count()
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
    const materia = await this.prisma.materia.findUnique({
      where: { id_Materia: id },
      include: { docente: true, ciclo: true, matriculas: true }
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }

    return materia;
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

  async update(id: number, data: UpdateMateriaDto) {
    await this.findOne(id);

    const updateData: any = {};
    if (data.nombre_Materia) updateData.nombre_Materia = data.nombre_Materia;
    if (data.creditos !== undefined) updateData.creditos = data.creditos;
    if (data.docenteId) updateData.docente = { connect: { id_docente: data.docenteId } };
    if (data.cicloId) updateData.ciclo = { connect: { id_Ciclo: data.cicloId } };

    return this.prisma.materia.update({
      where: { id_Materia: id },
      data: updateData
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.materia.delete({
      where: { id_Materia: id }
    });
  }
}
