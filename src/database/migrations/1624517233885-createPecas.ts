import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createPecas1624517233885 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'pecas',
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
          name: 'reference',
          type: 'varchar',
          isUnique: true
        },

        {
          name: 'user_id',
          type: 'uuid'
        },
        {
          name: 'materia_reference',
          type: 'varchar'
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
  }
}
