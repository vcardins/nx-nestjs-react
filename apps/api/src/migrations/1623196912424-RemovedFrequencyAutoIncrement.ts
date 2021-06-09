import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedFrequencyAutoIncrement1623196912424 implements MigrationInterface {
    name = 'RemovedFrequencyAutoIncrement1623196912424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_frequency" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(20) NOT NULL, "days_apart" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_frequency"("id", "name", "days_apart") SELECT "id", "name", "days_apart" FROM "frequency"`);
        await queryRunner.query(`DROP TABLE "frequency"`);
        await queryRunner.query(`ALTER TABLE "temporary_frequency" RENAME TO "frequency"`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "description" text, "proposed_time" time, "executor_user_id" integer, "assigned_user_id" integer, "frequency_id" integer, "household_id" integer, "room_type_id" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id") SELECT "id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id" FROM "task"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "task"`);
        await queryRunner.query(`CREATE TABLE "temporary_room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "room_task"`);
        await queryRunner.query(`DROP TABLE "room_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_room_task" RENAME TO "room_task"`);
        await queryRunner.query(`CREATE TABLE "temporary_frequency" ("id" integer PRIMARY KEY NOT NULL, "name" varchar(20) NOT NULL, "days_apart" integer NOT NULL, CONSTRAINT "UQ_3598f61330787fdbfb730cf87ed" UNIQUE ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_frequency"("id", "name", "days_apart") SELECT "id", "name", "days_apart" FROM "frequency"`);
        await queryRunner.query(`DROP TABLE "frequency"`);
        await queryRunner.query(`ALTER TABLE "temporary_frequency" RENAME TO "frequency"`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "description" text, "proposed_time" time, "executor_user_id" integer, "assigned_user_id" integer, "frequency_id" integer, "household_id" integer, "room_type_id" integer, CONSTRAINT "FK_9b2e45879240b2c619b0d2273cf" FOREIGN KEY ("executor_user_id") REFERENCES "household_member" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f3172a11cafc66aa03fded6cf8c" FOREIGN KEY ("assigned_user_id") REFERENCES "household_member" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b6aa8a02ed2e029ce4f88c7e75a" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b9e4af9a6d7b51f25833a4fa954" FOREIGN KEY ("household_id", "room_type_id") REFERENCES "household_room" ("household_id", "room_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id") SELECT "id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id" FROM "task"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "task"`);
        await queryRunner.query(`CREATE TABLE "temporary_room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, CONSTRAINT "FK_d80dc82d7a65e671a44f72da986" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_14916fc67f6095103147b58d49e" FOREIGN KEY ("task_template_id") REFERENCES "task_template" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2acfaccd722088e2afd3f87fe76" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "room_task"`);
        await queryRunner.query(`DROP TABLE "room_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_room_task" RENAME TO "room_task"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_task" RENAME TO "temporary_room_task"`);
        await queryRunner.query(`CREATE TABLE "room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "temporary_room_task"`);
        await queryRunner.query(`DROP TABLE "temporary_room_task"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "description" text, "proposed_time" time, "executor_user_id" integer, "assigned_user_id" integer, "frequency_id" integer, "household_id" integer, "room_type_id" integer)`);
        await queryRunner.query(`INSERT INTO "task"("id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id") SELECT "id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`ALTER TABLE "frequency" RENAME TO "temporary_frequency"`);
        await queryRunner.query(`CREATE TABLE "frequency" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(20) NOT NULL, "days_apart" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "frequency"("id", "name", "days_apart") SELECT "id", "name", "days_apart" FROM "temporary_frequency"`);
        await queryRunner.query(`DROP TABLE "temporary_frequency"`);
        await queryRunner.query(`ALTER TABLE "room_task" RENAME TO "temporary_room_task"`);
        await queryRunner.query(`CREATE TABLE "room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, CONSTRAINT "FK_d80dc82d7a65e671a44f72da986" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "temporary_room_task"`);
        await queryRunner.query(`DROP TABLE "temporary_room_task"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "description" text, "proposed_time" time, "executor_user_id" integer, "assigned_user_id" integer, "frequency_id" integer, "household_id" integer, "room_type_id" integer, CONSTRAINT "FK_b6aa8a02ed2e029ce4f88c7e75a" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "task"("id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id") SELECT "id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`ALTER TABLE "frequency" RENAME TO "temporary_frequency"`);
        await queryRunner.query(`CREATE TABLE "frequency" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(20) NOT NULL, "days_apart" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "frequency"("id", "name", "days_apart") SELECT "id", "name", "days_apart" FROM "temporary_frequency"`);
        await queryRunner.query(`DROP TABLE "temporary_frequency"`);
    }

}
