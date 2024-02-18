import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
      host: '',
      port: 5432,
      password: '',
      username: '',
      entities: [],
      database: '',
      synchronize: true,
      logging: true,
  })],
  controllers: [ClientesController],
  providers: [ClientesService]
})
export class ClientesModule {}
