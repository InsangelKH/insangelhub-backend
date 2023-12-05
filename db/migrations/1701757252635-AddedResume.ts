import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedResume1701757252635 implements MigrationInterface {
    name = 'AddedResume1701757252635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "mail" character varying NOT NULL, "telegram" character varying NOT NULL, "skills" text NOT NULL, "languages" text NOT NULL DEFAULT '["Russian - Native","English - C1 Advanced"]', "summary" character varying NOT NULL, CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "resume"`);
    }

}
