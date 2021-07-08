import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

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

    await queryRunner.dropColumn('users', 'reset_token')
    await queryRunner.dropColumn('users', 'reset_token_expires')

    await queryRunner.createForeignKey('restospecas', new TableForeignKey({
      name: 'FkeyRefreshTokenToUser',
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('freshToken', 'FkeyRefreshTokenToUser')
    await queryRunner.dropTable('freshToken')

    await queryRunner.addColumn('users', new TableColumn({
      name: 'reset_token_expires',
      type: 'varchar',
      isNullable: true
    }))

    await queryRunner.addColumn('users', new TableColumn({
      name: 'reset_token',
      type: 'varchar',
      isNullable: true
    }))
  }
}
