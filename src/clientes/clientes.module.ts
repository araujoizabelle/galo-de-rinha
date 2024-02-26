import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transacao } from './entities/transaction.entity';
import { Cliente } from './entities/cliente.entity';
import { TransacaoService } from './transacao.service';


@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), TypeOrmModule.forFeature([Transacao])],
  controllers: [ClientesController],
  providers: [ClientesService, TransacaoService]
})
export class ClientesModule {}
