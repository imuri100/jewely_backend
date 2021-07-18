import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterTablePiceAddFieldPDF1626599662899 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'PDF_url',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pecas', 'PDF_url')
  }
}
