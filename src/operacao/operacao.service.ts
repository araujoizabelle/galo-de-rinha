import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientesService } from 'src/cliente/cliente.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { CreateTransacaoDto } from 'src/transacao/dto/create-transacao';
import { Transacao } from 'src/transacao/entities/transacao.entity';
import { TransacaoService } from 'src/transacao/transacao.service';

@Injectable()
export class OperacaoService {
  constructor(
    private readonly clienteService: ClientesService, 
    private readonly transacaoService: TransacaoService) {}


  async operateTransaction(createTransacaoDto: CreateTransacaoDto, id: number) {
    const cliente = await this.clienteService.findById(id);

    const saldo = cliente.saldo;
    const limite = cliente.limite;
    const tipo = createTransacaoDto.tipo.toUpperCase();
    const valor = createTransacaoDto.valor;

    const newSaldo = this.transacaoService.operateValue(saldo, limite, tipo, valor);

    try {
      const updated = await this.clienteService.update(id, { saldo: newSaldo })
      await this.transacaoService.create(createTransacaoDto, id)
      return updated;   
    } catch (error) {
      throw new BadRequestException(`Error`, error);
    }

  }

  async getExtract(id: number) {
    const client = await this.clienteService.findById(id);
    const lastTransactions = await this.transacaoService.findAllByClientId(client.id, 10)

    return this.mountExtractInfo(client, lastTransactions)
  }

  mountExtractInfo (client: Cliente, lastTransactions: Array<Transacao>) {
    return {
      "saldo": {
        "total": client.saldo,
        "data_extrato": new Date(),
        "limite": client.limite
      },
      "ultimas_transacoes": [
        ...lastTransactions
      ]
    }
  }

}
