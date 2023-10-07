import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTodoTable1696483548169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "todos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "done",
            type: "boolean",
            isNullable: true,
            default: false,
          },
          {
            name: "deadline",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: `now()`,
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: `now()`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("todos");
  }
}
