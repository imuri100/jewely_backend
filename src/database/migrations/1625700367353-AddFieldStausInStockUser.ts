import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldStausInStockUser1625700367353 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('stockUsers', new TableColumn({
      name: 'status',
      type: 'boolean',
      default: false
    }))
    await queryRunner.addColumn('stockUsers', new TableColumn({
      name: 'message',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('stockUsers', 'status')
    await queryRunner.dropColumn('stockUsers', 'message')
  }
}
