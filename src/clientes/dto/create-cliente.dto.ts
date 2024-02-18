import { IsNumber } from "class-validator";

export class CreateClienteDto {
    @IsNumber()
    limite: number = 0;

    @IsNumber()
    saldoInicial: number = 0;
}
