import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateMateriaDto {
  @IsOptional()
  @IsString()
  nombre_Materia?: string;

  @IsOptional()
  @IsInt()
  creditos?: number;

  @IsOptional()
  @IsInt()
  docenteId?: number;

  @IsOptional()
  @IsInt()
  cicloId?: number;
}
