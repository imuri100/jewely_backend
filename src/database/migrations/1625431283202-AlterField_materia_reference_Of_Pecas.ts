import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterFieldMateriaReferenceOfPecas1625431283202 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pecas', 'materia_reference')
    await queryRunner.dropColumn('pecas', 'quantity')
    await queryRunner.dropColumn('pecas', 'stock_User_id')

    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'materia_reference',
      type: 'jsonb',
      isNullable: true
    }))

    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'stock_User_id',
      type: 'uuid',
      isArray: true,
      isNullable: true

    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pecas', 'materia_reference')
    await queryRunner.dropColumn('pecas', 'user_id')
    await queryRunner.dropColumn('pecas', 'stock_User_id')

    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'materia_reference',
      type: 'uuid',
      isArray: true,
      isNullable: true
    }))
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'quantity',
      type: 'integer',
      isNullable: true
    }))
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'user_id',
      type: 'uuid',
      isNullable: true
    }))
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'stock_User_id',
      type: 'uuid',
      isNullable: true

    }))
  }
}
