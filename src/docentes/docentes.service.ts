import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Injectable()
export class DocentesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.docente.findMany({
        skip,
        take: limit,
        include: { materias: true }
      }),
      this.prisma.docente.count()
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
    const docente = await this.prisma.docente.findUnique({
      where: { id_docente: id },
      include: { materias: true }
    });

    if (!docente) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }

    return docente;
  }

  async create(data: CreateDocenteDto) {
    return this.prisma.docente.create({ data });
  }

  async update(id: number, data: UpdateDocenteDto) {
    await this.findOne(id);
    return this.prisma.docente.update({
      where: { id_docente: id },
      data
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.docente.delete({
      where: { id_docente: id }
    });
  }
}
