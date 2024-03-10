import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class InitialSql1710027453255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'cliente',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'limite',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'saldo',
            type: 'int4',
            isNullable: false,
          },
        ],
      }),
      false,
    );

    await queryRunner.createTable(
        new Table({
            name: 'transacao',
            columns: [
                {
                    name: 'id',
                    type: 'int4',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'tipo',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'descricao',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamptz',
                    isNullable: false,
                    default: 'NOW()', // Define o valor padrão como a data e hora atual
                },
                {
                    name: 'clienteId',
                    type: 'int4',
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['clienteId'],
                    referencedTableName: 'cliente',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE', // Define ação de deleção em cascata
                },
            ],
        }),
        true, // Indica que essa tabela deve ser criada apenas se não existir
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`DROP TABLE cliente`);
    queryRunner.query(`DROP TABLE transacao`);
  }
}
