import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterFieldReferenceOfPecaToOutIncrement1625641643727 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'reference',
      type: 'int',
      isGenerated: true,
      generationStrategy: 'increment'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pecas', 'reference')
  }
}
