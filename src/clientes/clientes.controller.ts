import { Controller, Get, Post, Body, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Post(':id/transacoes')
  @UsePipes(ValidationPipe)
  createTransaction(@Param('id', ParseIntPipe) id: number, @Body() createTransactionDto: CreateTransactionDto) {
    return this.clientesService.doTransaction(createTransactionDto, id);
  /**
   * {
        "limite" : 100000,
        "saldo" : -9098
      }
   */
  }

  @Get(':id/extrato')
  getExtract(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.getExtract(id);
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
