import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transacao } from './entities/transaction.entity';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao) private readonly transacaoRepository: Repository<Transacao>,
  ) {}

 async create(createTransactionDto: CreateTransactionDto, id: number) {
    const transacao: Transacao = new Transacao();
    transacao.clienteId = id;
    transacao.descricao = createTransactionDto.descricao;
    transacao.tipo = createTransactionDto.tipo;
    transacao.valor = createTransactionDto.valor;
    transacao.id = Math.random();

    const transactionSaved = await this.transacaoRepository.save(transacao)
    return transactionSaved;
  }
}


