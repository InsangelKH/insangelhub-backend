import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDefaultArticleImg1700336701214 implements MigrationInterface {
    name = 'AddedDefaultArticleImg1700336701214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "image" SET DEFAULT 'default-article.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "image" DROP DEFAULT`);
    }

}
