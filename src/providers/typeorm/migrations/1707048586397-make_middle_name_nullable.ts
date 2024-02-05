import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeMiddleNameNullable1707048586397 implements MigrationInterface {
    name = 'MakeMiddleNameNullable1707048586397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "middle_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "middle_name" SET NOT NULL`);
    }

}
