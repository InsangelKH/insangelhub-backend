import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultUserImage1699693512168 implements MigrationInterface {
    name = 'DefaultUserImage1699693512168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "newColumn" character varying NOT NULL DEFAULT 'default-image.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "newColumn"`);
    }

}
