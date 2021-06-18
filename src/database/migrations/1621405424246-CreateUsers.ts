import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateUsers1621405424246 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'cargo',
            type: 'varchar',
            isArray: true,
            isNullable: true
          },

          {
            name: 'avatar',
            type: 'varchar'
          },

          {
            name: 'reset_token',
            type: 'varchar',
            isNullable: true
          },

          {
            name: 'reset_token_expires',
            type: 'varchar',
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
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
