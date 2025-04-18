import { MigrationInterface, QueryRunner } from "typeorm";

export class addExchangeRates1744935284746 implements MigrationInterface {
    name = 'addExchangeRates1744935284746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying(255) NOT NULL, "currency" character varying(255) NOT NULL, "amount" double precision NOT NULL, "code" character varying(255) NOT NULL, "rate" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c87dc76495d95ed8fd3a56809" ON "exchange_rate" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9c87dc76495d95ed8fd3a56809"`);
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
    }

}
