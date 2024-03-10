[
    {
      "synchronize": false,
      "type": 'postgres',
      "database": 'rinha',
      "url": "postgresql://admin:123@db:5432/rinha",
      "entities": ["dist/**/*.entity{ .ts,.js}"],
      "migrations": ["dist/database/migrations/*{.ts,.js}"],
      "migrationsTableName": "migrations_typeorm",
      "migrationsRun": true
    }
  ]