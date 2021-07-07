import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class RestosDePecas1625694761081 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'restospecas',
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
          name: 'peca_deleted',
          type: 'varchar'
        },

        {
          name: 'peca_id',
          type: 'uuid',
          isNullable: true
        },

        {
          name: 'userId',
          type: 'uuid',
          isNullable: true
        }

      ]

    }))

    await queryRunner.createForeignKey('restospecas', new TableForeignKey({
      name: 'FkeyRestosToUser',
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))

    await queryRunner.createForeignKey('restospecas', new TableForeignKey({
      name: 'FkeyRestoPecasToPecas',
      columnNames: ['peca_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'pecas',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('restospecas', 'FkeyRestosToUser')
    await queryRunner.dropForeignKey('restospecas', 'FkeyRestoPecasToPecas')
    await queryRunner.dropTable('restospecas')
  }
}
