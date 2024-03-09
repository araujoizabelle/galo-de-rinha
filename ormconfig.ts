import { DataSource, DataSourceOptions } from "typeorm";
import { Cliente } from './src/cliente/entities/cliente.entity';
import { Transacao } from './src/transacao/entities/transacao.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'crebito',
    entities: [Cliente, Transacao],
    url: 'postgres://postgres:postgres@localhost:5432/crebito?sslmode=disable',
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource