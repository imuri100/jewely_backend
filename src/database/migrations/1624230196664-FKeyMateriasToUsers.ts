import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class FKeyMateriasToUsers1624230196664 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('materias', new TableColumn({
      name: 'user_id',
      type: 'uuid'
    }))

    await queryRunner.createForeignKey('materias', new TableForeignKey({
      name: 'FkeyMateriasToUSers',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('materias', 'FkeyMateriasToUSers')
    await queryRunner.dropColumn('materias', 'user_id')
  }
}
