import { IsString, IsOptional } from 'class-validator';

export class UpdateCarreraDto {
  @IsOptional()
  @IsString()
  nombre_Carrera?: string;
}
