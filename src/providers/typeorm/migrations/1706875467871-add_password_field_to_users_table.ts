import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordFieldToUsersTable1706875467871 implements MigrationInterface {
    name = 'AddPasswordFieldToUsersTable1706875467871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
