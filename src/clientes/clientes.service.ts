import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransacaoService } from './transacao.service';

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

    const newSaldo = saldo - createTransactionDto.valor;

    if (createTransactionDto.tipo.toUpperCase() == 'D' && newSaldo < limite) {
      throw new UnprocessableEntityException(`Limite indisponível`);
    }

    try {
      const updated = await this.clienteRepository.update(id, {saldoInicial: newSaldo})
      await this.transacaoService.create(createTransactionDto, id)
      return updated;   
    } catch (error) {
      throw new BadRequestException(`Error`, error);
    }

  }

  getExtract(id: number) {
    return 'extrato';
  }
}


