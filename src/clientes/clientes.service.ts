import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transacao } from './entities/transaction.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Transacao) private readonly transacaoRepository: Repository<Transacao>
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

    if (createTransactionDto.tipo.toUpperCase() == 'D') {
      const saldo = cliente.saldoInicial;
      const limite = cliente.limite;

      const newSaldo = saldo - createTransactionDto.valor;

      if (newSaldo < limite) {
        throw new UnprocessableEntityException(`Limite indisponível`);
      }

      const updated = this.clienteRepository.update(id, {saldoInicial: newSaldo})
      const transacao: Transacao = new Transacao();
      
      transacao.clienteId = id;
      transacao.descricao = createTransactionDto.descricao;
      transacao.tipo = createTransactionDto.tipo;
      transacao.valor = createTransactionDto.valor;
      transacao.id = Math.random();

      const transactionSaved = this.transacaoRepository.save(transacao)
      return updated;
    }

  }

  getExtract(id: number) {
    return 'extrato';
  }
}


