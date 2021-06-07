import {MigrationInterface, QueryRunner} from "typeorm";

export class RefTaskTemplate1623013943709 implements MigrationInterface {
    name = 'RefTaskTemplate1623013943709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_category_task" ("category_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, CONSTRAINT "FK_66b0761bd146f84a6dd8f4a31db" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c6e43c948df93c81793a50e321" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("category_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_category_task"("category_id", "task_id", "relevance", "frequency_id") SELECT "category_id", "task_id", "relevance", "frequency_id" FROM "category_task"`);
        await queryRunner.query(`DROP TABLE "category_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_category_task" RENAME TO "category_task"`);
        await queryRunner.query(`CREATE TABLE "temporary_category_task" ("category_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, CONSTRAINT "FK_66b0761bd146f84a6dd8f4a31db" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c6e43c948df93c81793a50e321" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("category_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_category_task"("category_id", "task_id", "relevance", "frequency_id") SELECT "category_id", "task_id", "relevance", "frequency_id" FROM "category_task"`);
        await queryRunner.query(`DROP TABLE "category_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_category_task" RENAME TO "category_task"`);
        await queryRunner.query(`CREATE TABLE "temporary_category_task" ("category_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, CONSTRAINT "FK_66b0761bd146f84a6dd8f4a31db" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c6e43c948df93c81793a50e321" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6c110c2aaf471bde96cbee8cbca" FOREIGN KEY ("task_template_id") REFERENCES "task_template" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("category_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_category_task"("category_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "category_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "category_task"`);
        await queryRunner.query(`DROP TABLE "category_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_category_task" RENAME TO "category_task"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_task" RENAME TO "temporary_category_task"`);
        await queryRunner.query(`CREATE TABLE "category_task" ("category_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, CONSTRAINT "FK_66b0761bd146f84a6dd8f4a31db" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c6e43c948df93c81793a50e321" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("category_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "category_task"("category_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "category_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "temporary_category_task"`);
        await queryRunner.query(`DROP TABLE "temporary_category_task"`);
        await queryRunner.query(`ALTER TABLE "category_task" RENAME TO "temporary_category_task"`);
        await queryRunner.query(`CREATE TABLE "category_task" ("category_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, CONSTRAINT "FK_66b0761bd146f84a6dd8f4a31db" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c6e43c948df93c81793a50e321" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("category_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "category_task"("category_id", "task_id", "relevance", "frequency_id") SELECT "category_id", "task_id", "relevance", "frequency_id" FROM "temporary_category_task"`);
        await queryRunner.query(`DROP TABLE "temporary_category_task"`);
        await queryRunner.query(`ALTER TABLE "category_task" RENAME TO "temporary_category_task"`);
        await queryRunner.query(`CREATE TABLE "category_task" ("category_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, CONSTRAINT "FK_66b0761bd146f84a6dd8f4a31db" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_706dd760a331f1f5093a54e47b4" FOREIGN KEY ("task_id") REFERENCES "task_template" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c6e43c948df93c81793a50e321" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("category_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "category_task"("category_id", "task_id", "relevance", "frequency_id") SELECT "category_id", "task_id", "relevance", "frequency_id" FROM "temporary_category_task"`);
        await queryRunner.query(`DROP TABLE "temporary_category_task"`);
    }

}
