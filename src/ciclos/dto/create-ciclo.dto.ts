import { IsInt, IsString } from 'class-validator';

export class CreateCicloDto {
  @IsInt()
  numero_Ciclo: number;

  @IsString()
  periodo: string;

  @IsInt()
  carreraId: number;
}
