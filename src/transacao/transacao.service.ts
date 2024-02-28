import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransacaoDto } from './dto/create-transacao';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transacao } from './entities/transacao.entity';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao) private readonly transacaoRepository: Repository<Transacao>,
    
  ) {}

  async create(createTransacaoDto: CreateTransacaoDto, id: number) {
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

  async findAllByClientId(clienteId: number, max: number) {
    const transactionsByClientId = await this.transacaoRepository.find({
      where: { clienteId },
      take: max
    });
    return transactionsByClientId;
  }

  operateValue (saldo: number, limite: number, tipo: string, valor: number) {
    const transformedValor = tipo === 'D' ? valor * -1 : valor;

    const newSaldo = saldo + (transformedValor);

    if (tipo === 'D' && newSaldo < limite * -1) {
      throw new UnprocessableEntityException(`Limite indisponível`);
    }

    return newSaldo;
  }

}


