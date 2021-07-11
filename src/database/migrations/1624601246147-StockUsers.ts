import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class StockUsers1624601246147 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'stockUsers',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },

        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'quantity',
          type: 'integer'
        },

        {
          name: 'materia_reference',
          type: 'integer',
          isNullable: true
        },
        {
          name: 'created_At',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_At',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stockUsers')
  }
}
