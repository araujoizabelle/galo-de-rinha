import { forwardRef, Module } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { ClientesController } from '../app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
// import { TransacaoService } from '../transacao/transacao.service';
import { TransacaoModule } from 'src/transacao/transacao.module';


@Module({
  imports: [forwardRef(() => TransacaoModule), TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesService]
})
export class ClientesModule {}
