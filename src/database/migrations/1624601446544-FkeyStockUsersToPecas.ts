import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class FkeyStockUsersToPecas1624601446544 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('stockUsers', new TableColumn({
      name: 'user_id',
      type: 'uuid'
    }))

    await queryRunner.addColumn('stockUsers', new TableColumn({
      name: 'materia_id',
      type: 'uuid'
    }))

    await queryRunner.createForeignKey('stockUsers', new TableForeignKey({
      name: 'FkeyStockUsersToUSers',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
    await queryRunner.createForeignKey('stockUsers', new TableForeignKey({
      name: 'FkeyStockUsersToMateria',
      columnNames: ['materia_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'materias',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('stockUsers', 'FkeyStockUsersToUSers')
    await queryRunner.dropForeignKey('stockUsers', 'FkeyStockUsersToMateria')
    await queryRunner.dropColumn('stockUsers', 'user_id')
    await queryRunner.dropColumn('stockUsers', 'materia_id')
  }
}
