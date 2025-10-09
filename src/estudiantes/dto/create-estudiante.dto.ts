import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  cedula: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono: string;

  @IsInt()
  carreraId: number;

  @IsInt()
  cicloId: number;
}
