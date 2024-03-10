import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    synchronize: false,
    type: 'postgres',
    database: 'rinha',
    entities: ["dist/**/*.entity{ .ts,.js}"],
    url: "postgresql://admin:123@db:5432/rinha",
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource