import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterTableUserColumnCargo1624230658304 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cargo')

    await queryRunner.addColumn('users', new TableColumn({

      name: 'cargo',
      type: 'varchar',
      isNullable: true

    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cargo')

    await queryRunner.addColumn('users', new TableColumn({

      name: 'cargo',
      type: 'varchar',
      isNullable: true

    }))
  }
}
