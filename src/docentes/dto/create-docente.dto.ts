import { IsString, IsEmail } from 'class-validator';

export class CreateDocenteDto {
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
}
