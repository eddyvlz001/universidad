import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateCicloDto {
  @IsOptional()
  @IsInt()
  numero_Ciclo?: number;

  @IsOptional()
  @IsString()
  periodo?: string;

  @IsOptional()
  @IsInt()
  carreraId?: number;
}
