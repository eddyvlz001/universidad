import { IsString, IsInt } from 'class-validator';

export class CreateMateriaDto {
  @IsString()
  nombre_Materia: string;

  @IsInt()
  creditos: number;

  @IsInt()
  docenteId: number;

  @IsInt()
  cicloId: number;
}
