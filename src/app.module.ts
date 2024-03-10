import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OperacaoModule } from './operacao/operacao.module';
import { AppController } from './app.controller';
import { OperacaoService } from './operacao/operacao.service';
import { ClientesModule } from './cliente/cliente.module';
import { TransacaoModule } from './transacao/transacao.module';
// import { dataSourceOptions } from './database/ormconfig';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot(),
    ClientesModule,
    TransacaoModule, 
    OperacaoModule
  ],
  providers: [OperacaoService],
  controllers: [AppController],
})
export class AppModule {}
