import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class FkeyPecasToStokUsers1624602658114 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'user_id',
      type: 'uuid'
    }))
    await queryRunner.addColumn('pecas', new TableColumn({
      name: 'stock_User_id',
      type: 'uuid'

    }))

    await queryRunner.createForeignKey('pecas', new TableForeignKey({
      name: 'FkeyPecasToUsers',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('pecas', new TableForeignKey({
      name: 'FkeyPecasToStockUsers',
      columnNames: ['stock_User_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'stockUsers',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('pecas', 'FkeyPecasToUsers')
    // await queryRunner.dropForeignKey('pecas', 'FkeyPecasToStockUsers')
    await queryRunner.dropColumn('pecas', 'user_id')
    await queryRunner.dropColumn('pecas', 'stock_User_id')
  }
}
