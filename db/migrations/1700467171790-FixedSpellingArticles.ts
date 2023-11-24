import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedSpellingArticles1700467171790 implements MigrationInterface {
    name = 'FixedSpellingArticles1700467171790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "createAt" TO "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "createdAt" TO "createAt"`);
    }

}
