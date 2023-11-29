import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDefaultAvatar1701258568153 implements MigrationInterface {
    name = 'AddedDefaultAvatar1701258568153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT 'default-avatar.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT ''`);
    }

}
