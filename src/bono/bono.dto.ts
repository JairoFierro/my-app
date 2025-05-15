import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class BonoDto {
  @IsNotEmpty()
  @IsNumber()
  readonly monto: number;

  @IsNumber()
  @IsNotEmpty()
  readonly calificacion: number;

  @IsString()
  @IsNotEmpty()
  readonly palabraClave: string;
}
