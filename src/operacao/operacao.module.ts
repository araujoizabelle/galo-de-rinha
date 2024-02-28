import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from 'src/cliente/cliente.module';
import { ClientesService } from 'src/cliente/cliente.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Transacao } from 'src/transacao/entities/transacao.entity';
import { TransacaoModule } from 'src/transacao/transacao.module';
import { TransacaoService } from 'src/transacao/transacao.service';
import { OperacaoService } from './operacao.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transacao]),
    TypeOrmModule.forFeature([Cliente]), 
    ClientesModule, 
    TransacaoModule 
  ],
  providers: [OperacaoService, ClientesService, TransacaoService]
})
export class OperacaoModule {}
