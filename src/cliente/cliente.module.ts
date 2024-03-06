import { Module } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClientesService],
  exports: [ClientesService]
})
export class ClientesModule {}
