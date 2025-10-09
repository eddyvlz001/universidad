import { IsString } from 'class-validator';

export class CreateCarreraDto {
  @IsString()
  nombre_Carrera: string;
}
