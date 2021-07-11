import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterTablePiceAddFieldArmazen1625919890731 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'armazen',
      type: 'boolean',
      default: false

    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pecas', 'armazen')
  }
}
