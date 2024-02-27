import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransacaoDto } from './dto/create-transacao';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transacao } from './entities/transacao.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ClientesService } from 'src/cliente/cliente.service';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao) private readonly transacaoRepository: Repository<Transacao>,
    private readonly clienteService: ClientesService
  ) {}

  async doTransaction(createTransacaoDto: CreateTransacaoDto, id: number) {
    const cliente = await this.clienteService.findById(id);

    const saldo = cliente.saldo;
    const limite = cliente.limite;
    const tipo = createTransacaoDto.tipo.toUpperCase();
    const valor = createTransacaoDto.valor;

    const newSaldo = this.operateValue(saldo, limite, tipo, valor);

    try {
      const updated = await this.clienteService.update(id, { saldo: newSaldo })
      await this.create(createTransacaoDto, id)
      return updated;   
    } catch (error) {
      throw new BadRequestException(`Error`, error);
    }

  }

  async getExtract(id: number) {
    const client = await this.clienteService.findById(id);
    const lastTransactions = await this.findAllByClientId(client.id, 10)

    return this.mountExtractInfo(client, lastTransactions)
  }

  private async create(createTransacaoDto: CreateTransacaoDto, id: number) {
    const transacao: Transacao = new Transacao();
    transacao.clienteId = id;
    transacao.descricao = createTransacaoDto.descricao;
    transacao.tipo = createTransacaoDto.tipo;
    transacao.valor = createTransacaoDto.valor;
    try {
      const transactionSaved = await this.transacaoRepository.save(transacao)
      return transactionSaved;
    } catch (error) {
      throw new BadRequestException(`Error`, error);
    }
  }

  private async findAllByClientId(clienteId: number, max: number) {
    const transactionsByClientId = await this.transacaoRepository.find({
      where: { clienteId },
      take: max
    });
    return transactionsByClientId;
  }

  private operateValue (saldo: number, limite: number, tipo: string, valor: number) {
    const transformedValor = tipo === 'D' ? valor * -1 : valor;

    const newSaldo = saldo + (transformedValor);

    if (tipo === 'D' && newSaldo < limite * -1) {
      throw new UnprocessableEntityException(`Limite indisponível`);
    }

    return newSaldo;
  }

  private mountExtractInfo (client: Cliente, lastTransactions: Array<Transacao>) {
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


