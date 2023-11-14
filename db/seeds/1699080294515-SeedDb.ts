import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1699080294515 implements MigrationInterface {
    name = 'SeedDb1699080294515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO users (username, email, password, role) VALUES ('Insangel', 'insangel@gmail.com', '$2b$10$SmUro8TpotQaLkwS21QTMuQ38JkhQQrBEYFPVCqhQPJ2bknAKMxzC', 'ADMIN')`
        );
    }

    public async down(): Promise<void> {}

}
