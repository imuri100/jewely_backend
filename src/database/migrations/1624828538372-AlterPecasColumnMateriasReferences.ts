import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterPecasColumnMateriasReferences1624828538372 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'materia_reference',
      type: 'uuid',
      isArray: true
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pecas', 'materia_reference')
  }
}
