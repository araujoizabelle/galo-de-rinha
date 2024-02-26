import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransacaoService } from './transacao.service';
import { Transacao } from './entities/transaction.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
    private readonly transacaoService: TransacaoService,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    const cliente: Cliente = new Cliente();
    cliente.limite = createClienteDto.limite;
    cliente.saldoInicial = createClienteDto.saldoInicial;

    return this.clienteRepository.save(cliente);
  }

  async doTransaction(createTransactionDto: CreateTransactionDto, id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
    });
    
    if (!cliente) {
      throw new NotFoundException(`Client with ID ${id} was not found`);
    }

    const saldo = cliente.saldoInicial;
    const limite = cliente.limite;
    const tipo = createTransactionDto.tipo.toUpperCase();
    const valor = createTransactionDto.valor;

    const newSaldo = this.operateValue(saldo, limite, tipo, valor);

    try {
      const updated = await this.clienteRepository.update(id, { saldoInicial: newSaldo })
      await this.transacaoService.create(createTransactionDto, id)
      return updated;   
    } catch (error) {
      throw new BadRequestException(`Error`, error);
    }

  }

  async getExtract(id: number) {
    const client = await this.clienteRepository.findOne({
      where: { id },
    });
    
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} was not found`);
    }

    const lastTransactions = await this.transacaoService.findAllByClientId(client.id, 10)

    return this.mountExtractInfo(client, lastTransactions)
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
        "total": client.saldoInicial,
        "data_extrato": new Date(),
        "limite": client.limite
      },
      "ultimas_transacoes": [
        ...lastTransactions
      ]
    }
  }
}


