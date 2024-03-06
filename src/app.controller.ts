import { Controller, Get, Post, Body, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { OperacaoService } from './operacao/operacao.service';
import { CreateTransacaoDto } from './transacao/dto/create-transacao';

@Controller('clientes')
export class AppController {
  constructor(private readonly operacaoService: OperacaoService) {}

  @Post(':id/transacoes')
  @UsePipes(ValidationPipe)
  createTransaction(@Param('id', ParseIntPipe) id: number, @Body() createTransactionDto: CreateTransacaoDto) {
    return this.operacaoService.operateTransaction(createTransactionDto, id);
  /**
   * {
        "limite" : 100000,
        "saldo" : -9098
      }
   */
  }

  @Get(':id/extrato')
  getExtract(@Param('id', ParseIntPipe) id: number) {
    return this.operacaoService.getExtract(id);
  /**
   * {
      "saldo": {
        "total": -9098,
        "data_extrato": "2024-01-17T02:34:41.217753Z",
        "limite": 100000
      },
      "ultimas_transacoes": [
        {
          "valor": 10,
          "tipo": "c",
          "descricao": "descricao",
          "realizada_em": "2024-01-17T02:34:38.543030Z"
        },
        {
          "valor": 90000,
          "tipo": "d",
          "descricao": "descricao",
          "realizada_em": "2024-01-17T02:34:38.543030Z"
        }
      ]
    }
   */
  }
}
