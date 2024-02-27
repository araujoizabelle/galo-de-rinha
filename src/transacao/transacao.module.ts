import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from 'src/cliente/cliente.module';
import { ClientesService } from 'src/cliente/cliente.service';
import { Transacao } from './entities/transacao.entity';
import { TransacaoService } from './transacao.service';

@Module({
  imports: [forwardRef(() => ClientesModule), TypeOrmModule.forFeature([Transacao])],
  providers: [TransacaoService, ClientesService]
})
export class TransacaoModule {}
