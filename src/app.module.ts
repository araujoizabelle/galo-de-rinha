import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OperacaoModule } from './operacao/operacao.module';
import { AppController } from './app.controller';
import { OperacaoService } from './operacao/operacao.service';
import { ClientesModule } from './cliente/cliente.module';
import { TransacaoModule } from './transacao/transacao.module';
import { dataSourceOptions } from 'ormconfig';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot(dataSourceOptions),
    ClientesModule,
    TransacaoModule, 
    OperacaoModule
  ],
  providers: [OperacaoService],
  controllers: [AppController],
})
export class AppModule {}
