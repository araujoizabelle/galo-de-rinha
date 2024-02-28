import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from './entities/transacao.entity';
import { TransacaoService } from './transacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao])],
  providers: [TransacaoService]
})
export class TransacaoModule {}
