import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class UpdateEstudianteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsInt()
  carreraId?: number;

  @IsOptional()
  @IsInt()
  cicloId?: number;
}
