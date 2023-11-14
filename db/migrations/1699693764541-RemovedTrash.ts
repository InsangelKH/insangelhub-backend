import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedTrash1699693764541 implements MigrationInterface {
    name = 'RemovedTrash1699693764541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "newColumn"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "newColumn" character varying NOT NULL DEFAULT 'default-image.jpg'`);
    }

}
