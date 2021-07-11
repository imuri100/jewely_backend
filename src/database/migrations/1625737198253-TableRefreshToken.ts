import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class TableRefreshToken1625737198253 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'freshToken',
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
          name: 'expiresIn',
          type: 'integer'
        },

        {
          name: 'userId',
          type: 'uuid'
        }
      ]

    }))

    await queryRunner.createForeignKey('freshToken', new TableForeignKey({
      name: 'FkeyRefreshTokenToUser',
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('restospecas', new TableForeignKey({
      name: 'FkeyRestosPecasToUser',
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('restospecas', 'FkeyRestosPecasToUser')
    await queryRunner.dropForeignKey('freshToken', 'FkeyRefreshTokenToUser')
    await queryRunner.dropTable('freshToken')
  }
}
