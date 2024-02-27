import { IsNumber } from "class-validator";

export class CreateClienteDto {
    @IsNumber()
    limite: number = 0;

    @IsNumber()
    saldo: number = 0;
}
