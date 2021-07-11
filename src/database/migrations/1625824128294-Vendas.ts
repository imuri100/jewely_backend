import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class Vendas1625824128294 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'vendas',
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
          name: 'peca_name',
          type: 'varchar'
        },

        {
          name: 'pecaId',
          type: 'uuid'
        },

        {
          name: 'userId',
          type: 'uuid'
        },
        {
          name: 'created_At',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
    await queryRunner.addColumn('stockUsers', new TableColumn({
      name: 'vendido',
      type: 'boolean',
      default: false
    }))

    await queryRunner.createForeignKey('vendas', new TableForeignKey({
      name: 'FkeyVendasToUsers',
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('vendas', new TableForeignKey({
      name: 'FkeyVendasToPecasInStock',
      columnNames: ['pecaId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'stockUsers',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vendas')
    await queryRunner.dropColumn('stockUsers', 'vendido')
    // await queryRunner.dropForeignKey('vendas', 'FkeyVendasToUsers')
    await queryRunner.dropForeignKey('vendas', 'FkeyVendasToPecas')
  }
}
