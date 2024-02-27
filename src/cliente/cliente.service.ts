import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const cliente: Cliente = new Cliente();
    cliente.limite = createClienteDto.limite;
    cliente.saldo = createClienteDto.saldo;

    return this.clienteRepository.save(cliente);
  }

  async findById(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
    })

    if (!cliente) {
      throw new NotFoundException(`Client with ID ${id} was not found`);
    }

    return cliente;
  }

  async update(id: number, updateDto: UpdateClienteDto) {
    const clienteUpdated = await this.clienteRepository.update(id, updateDto);
    
    if (!clienteUpdated) {
      throw new NotFoundException(`Client with ID ${id} was not found`);
    }
  }
}


