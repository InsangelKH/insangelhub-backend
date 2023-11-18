import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedArticlesEntity1700308449093 implements MigrationInterface {
    name = 'CreatedArticlesEntity1700308449093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NOT NULL, "image" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" text NOT NULL, "blocks" jsonb, "authorId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
