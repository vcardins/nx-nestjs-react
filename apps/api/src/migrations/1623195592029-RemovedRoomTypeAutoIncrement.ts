import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedRoomTypeAutoIncrement1623195592029 implements MigrationInterface {
    name = 'RemovedRoomTypeAutoIncrement1623195592029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "room_task"`);
        await queryRunner.query(`DROP TABLE "room_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_room_task" RENAME TO "room_task"`);
        await queryRunner.query(`CREATE TABLE "temporary_household_room" ("household_id" integer NOT NULL, "room_type_id" integer NOT NULL, "custom_name" varchar(60), PRIMARY KEY ("household_id", "room_type_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_household_room"("household_id", "room_type_id", "custom_name") SELECT "household_id", "room_type_id", "custom_name" FROM "household_room"`);
        await queryRunner.query(`DROP TABLE "household_room"`);
        await queryRunner.query(`ALTER TABLE "temporary_household_room" RENAME TO "household_room"`);
        await queryRunner.query(`CREATE TABLE "temporary_room_type" ("id" integer PRIMARY KEY NOT NULL, "name" varchar(40) NOT NULL, "description" varchar(255), CONSTRAINT "UQ_abd0f8a4c8a444a84fa2b343353" UNIQUE ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_room_type"("id", "name", "description") SELECT "id", "name", "description" FROM "room_type"`);
        await queryRunner.query(`DROP TABLE "room_type"`);
        await queryRunner.query(`ALTER TABLE "temporary_room_type" RENAME TO "room_type"`);
        await queryRunner.query(`CREATE TABLE "temporary_room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, CONSTRAINT "FK_d80dc82d7a65e671a44f72da986" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_14916fc67f6095103147b58d49e" FOREIGN KEY ("task_template_id") REFERENCES "task_template" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2acfaccd722088e2afd3f87fe76" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "room_task"`);
        await queryRunner.query(`DROP TABLE "room_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_room_task" RENAME TO "room_task"`);
        await queryRunner.query(`CREATE TABLE "temporary_household_room" ("household_id" integer NOT NULL, "room_type_id" integer NOT NULL, "custom_name" varchar(60), CONSTRAINT "FK_6b64790e9b3d2bfcc847ff64dee" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9ed4adaabb9bed26a5718dbd3d6" FOREIGN KEY ("household_id") REFERENCES "household" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("household_id", "room_type_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_household_room"("household_id", "room_type_id", "custom_name") SELECT "household_id", "room_type_id", "custom_name" FROM "household_room"`);
        await queryRunner.query(`DROP TABLE "household_room"`);
        await queryRunner.query(`ALTER TABLE "temporary_household_room" RENAME TO "household_room"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "household_room" RENAME TO "temporary_household_room"`);
        await queryRunner.query(`CREATE TABLE "household_room" ("household_id" integer NOT NULL, "room_type_id" integer NOT NULL, "custom_name" varchar(60), PRIMARY KEY ("household_id", "room_type_id"))`);
        await queryRunner.query(`INSERT INTO "household_room"("household_id", "room_type_id", "custom_name") SELECT "household_id", "room_type_id", "custom_name" FROM "temporary_household_room"`);
        await queryRunner.query(`DROP TABLE "temporary_household_room"`);
        await queryRunner.query(`ALTER TABLE "room_task" RENAME TO "temporary_room_task"`);
        await queryRunner.query(`CREATE TABLE "room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "temporary_room_task"`);
        await queryRunner.query(`DROP TABLE "temporary_room_task"`);
        await queryRunner.query(`ALTER TABLE "room_type" RENAME TO "temporary_room_type"`);
        await queryRunner.query(`CREATE TABLE "room_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(40) NOT NULL, "description" varchar(255), CONSTRAINT "UQ_abd0f8a4c8a444a84fa2b343353" UNIQUE ("id"))`);
        await queryRunner.query(`INSERT INTO "room_type"("id", "name", "description") SELECT "id", "name", "description" FROM "temporary_room_type"`);
        await queryRunner.query(`DROP TABLE "temporary_room_type"`);
        await queryRunner.query(`ALTER TABLE "household_room" RENAME TO "temporary_household_room"`);
        await queryRunner.query(`CREATE TABLE "household_room" ("household_id" integer NOT NULL, "room_type_id" integer NOT NULL, "custom_name" varchar(60), CONSTRAINT "FK_6b64790e9b3d2bfcc847ff64dee" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("household_id", "room_type_id"))`);
        await queryRunner.query(`INSERT INTO "household_room"("household_id", "room_type_id", "custom_name") SELECT "household_id", "room_type_id", "custom_name" FROM "temporary_household_room"`);
        await queryRunner.query(`DROP TABLE "temporary_household_room"`);
        await queryRunner.query(`ALTER TABLE "room_task" RENAME TO "temporary_room_task"`);
        await queryRunner.query(`CREATE TABLE "room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, CONSTRAINT "FK_2acfaccd722088e2afd3f87fe76" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "temporary_room_task"`);
        await queryRunner.query(`DROP TABLE "temporary_room_task"`);
    }

}
