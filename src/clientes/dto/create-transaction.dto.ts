import { IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTransactionDto {
    @IsNumber()
    // representa centavos
    valor: number;

    @IsString()
    @Matches(/[DCdc].*$/, {
        message: 'Valor deve ser C ou D',
      })
    tipo: string;

    @IsString()
    @MinLength(1)
    @MaxLength(10)
    descricao: string;
}