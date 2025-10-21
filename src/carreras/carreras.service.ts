import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarrerasService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.carrera.findMany({
        skip,
        take: limit,
        include: { especialidades: true, ciclos: true, estudiantes: true }
      }),
      this.prisma.carrera.count()
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
    const carrera = await this.prisma.carrera.findUnique({
      where: { id_Carrera: id },
      include: { especialidades: true, ciclos: true, estudiantes: true }
    });

    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }

    return carrera;
  }

  async create(data: CreateCarreraDto) {
    return this.prisma.carrera.create({ data });
  }

  async update(id: number, data: UpdateCarreraDto) {
    await this.findOne(id);
    return this.prisma.carrera.update({
      where: { id_Carrera: id },
      data
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.carrera.delete({
      where: { id_Carrera: id }
    });
  }
}
