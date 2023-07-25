import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1690297756625 implements MigrationInterface {
    name = 'FirstMigration1690297756625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "full_name" character varying(100) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(100) NOT NULL, "phone_number" character varying(20) NOT NULL, "created_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "full_name" character varying(100) NOT NULL, "email" character varying(45) NOT NULL, "phone_number" character varying(20) NOT NULL, "created_at" date NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
