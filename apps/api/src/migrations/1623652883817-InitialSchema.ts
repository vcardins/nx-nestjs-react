import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1623652883817 implements MigrationInterface {
    name = 'InitialSchema1623652883817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resource" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar CHECK( name IN ('user','user-group','permission','todo','household','task','task-template','room-type','frequency','operation','admin','room') ) NOT NULL, "description" varchar(255) NOT NULL, "parent_resource_id" integer, CONSTRAINT "UQ_c8ed18ff47475e2c4a7bf59daa0" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "operation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar CHECK( name IN ('read','create','update','delete') ) NOT NULL, "description" varchar(100) NOT NULL, CONSTRAINT "UQ_54bef81947d8e6ad96d1cc022a3" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(120) NOT NULL, "resource_id" integer, "operation_id" integer)`);
        await queryRunner.query(`CREATE TABLE "role" ("id" varchar CHECK( id IN ('1','2','8') ) PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, CONSTRAINT "UQ_b36bcfe02fc8de3c57a8b2391c2" UNIQUE ("id"), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "public_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "key" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_created" datetime NOT NULL, "remote_ip_addr" varchar(255), "user_id" integer)`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("user_id" integer PRIMARY KEY NOT NULL, "picture_url" varchar(255), "bio" varchar(255), "first_name" varchar(30), "last_name" varchar(30), "date_of_birth" varchar, "locale" varchar(3), CONSTRAINT "UQ_eee360f3bff24af1b6890765201" UNIQUE ("user_id"), CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "hashedPassword" varchar(255) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "phone_number" varchar(12), "phone_verification_code" varchar(8), "phone_verification_code_date_sent" datetime, "last_login" datetime, "last_failed_login" datetime, "date_account_verified" datetime DEFAULT (0), "verification_key" varchar(255), "date_verification_key_sent" datetime, "verification_key_purpose" varchar CHECK( verification_key_purpose IN ('1','2') ), "verification_storage" varchar(100), "create_ip" varchar(255), "date_account_locked" datetime, "date_account_closed" datetime, "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "last_password_changed" datetime, "requires_password_reset" boolean NOT NULL DEFAULT (0), "last_failed_password_reset" datetime, "failed_password_reset_count" integer, "failed_login_count" integer, "current_hashed_refresh_token" varchar, "last_update_ip" varchar(255), "last_updated" datetime, "avatarId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"))`);
        await queryRunner.query(`CREATE TABLE "oauth_access_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "provider_client_id" varchar(200) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200), "expires_at" datetime, "token_type" varchar(200), "scope" varchar(512), "user_id" integer)`);
        await queryRunner.query(`CREATE TABLE "household_member" ("user_id" integer PRIMARY KEY NOT NULL, "date_created" datetime NOT NULL, "is_default" boolean, "is_owner" boolean NOT NULL, "description" varchar(40), "household_id" integer, CONSTRAINT "UQ_66898819f7c858a081a9dcff3fc" UNIQUE ("user_id"), CONSTRAINT "REL_66898819f7c858a081a9dcff3f" UNIQUE ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "description" text, "proposed_time" time, "executor_user_id" integer, "assigned_user_id" integer, "frequency_id" integer, "household_id" integer, "room_type_id" integer)`);
        await queryRunner.query(`CREATE TABLE "frequency" ("id" integer PRIMARY KEY NOT NULL, "name" varchar(20) NOT NULL, "days_apart" integer NOT NULL, CONSTRAINT "UQ_3c0ef2aca8cb1bdf78434dafcb0" UNIQUE ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_template" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "description" text, "is_active" boolean, "estimated_time" integer, "reward_points" integer)`);
        await queryRunner.query(`CREATE TABLE "room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`CREATE TABLE "room_type" ("id" integer PRIMARY KEY NOT NULL, "name" varchar(40) NOT NULL, "description" varchar(255), CONSTRAINT "UQ_abd0f8a4c8a444a84fa2b343353" UNIQUE ("id"))`);
        await queryRunner.query(`CREATE TABLE "household_room" ("household_id" integer NOT NULL, "room_type_id" integer NOT NULL, "custom_name" varchar(60), PRIMARY KEY ("household_id", "room_type_id"))`);
        await queryRunner.query(`CREATE TABLE "household" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "main_user_id" integer)`);
        await queryRunner.query(`CREATE TABLE "household_member_invitation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "full_name" varchar(100), "date_created" datetime NOT NULL, "date_accepted" datetime, "household_id" integer, "sender_user_id" integer, CONSTRAINT "UQ_5c20dd2cc000411aa800ddd20ce" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "due_date" datetime, "assignee_id" integer)`);
        await queryRunner.query(`CREATE TABLE "role_permission" ("permission_id" integer NOT NULL, "role_id" varchar CHECK( role_id IN ('1','2','8') ) NOT NULL, PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "role_permission" ("role_id") `);
        await queryRunner.query(`CREATE TABLE "user_role" ("role_id" varchar CHECK( role_id IN ('1','2','8') ) NOT NULL, "user_id" integer NOT NULL, PRIMARY KEY ("role_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "temporary_resource" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar CHECK( name IN ('user','user-group','permission','todo','household','task','task-template','room-type','frequency','operation','admin','room') ) NOT NULL, "description" varchar(255) NOT NULL, "parent_resource_id" integer, CONSTRAINT "UQ_c8ed18ff47475e2c4a7bf59daa0" UNIQUE ("name"), CONSTRAINT "FK_2968f88df4c838beff13bd21efe" FOREIGN KEY ("parent_resource_id") REFERENCES "resource" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_resource"("id", "name", "description", "parent_resource_id") SELECT "id", "name", "description", "parent_resource_id" FROM "resource"`);
        await queryRunner.query(`DROP TABLE "resource"`);
        await queryRunner.query(`ALTER TABLE "temporary_resource" RENAME TO "resource"`);
        await queryRunner.query(`CREATE TABLE "temporary_permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(120) NOT NULL, "resource_id" integer, "operation_id" integer, CONSTRAINT "FK_8cb319db6c644b6e59b98bdfd98" FOREIGN KEY ("resource_id") REFERENCES "resource" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4b40748dc270eda0bdba9e9c5de" FOREIGN KEY ("operation_id") REFERENCES "operation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_permission"("id", "name", "resource_id", "operation_id") SELECT "id", "name", "resource_id", "operation_id" FROM "permission"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`ALTER TABLE "temporary_permission" RENAME TO "permission"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_created" datetime NOT NULL, "remote_ip_addr" varchar(255), "user_id" integer, CONSTRAINT "FK_13275383dcdf095ee29f2b3455a" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_session"("id", "date_created", "remote_ip_addr", "user_id") SELECT "id", "date_created", "remote_ip_addr", "user_id" FROM "user_session"`);
        await queryRunner.query(`DROP TABLE "user_session"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_session" RENAME TO "user_session"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_profile" ("user_id" integer PRIMARY KEY NOT NULL, "picture_url" varchar(255), "bio" varchar(255), "first_name" varchar(30), "last_name" varchar(30), "date_of_birth" varchar, "locale" varchar(3), CONSTRAINT "UQ_eee360f3bff24af1b6890765201" UNIQUE ("user_id"), CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"), CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_profile"("user_id", "picture_url", "bio", "first_name", "last_name", "date_of_birth", "locale") SELECT "user_id", "picture_url", "bio", "first_name", "last_name", "date_of_birth", "locale" FROM "user_profile"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_profile" RENAME TO "user_profile"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "hashedPassword" varchar(255) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "phone_number" varchar(12), "phone_verification_code" varchar(8), "phone_verification_code_date_sent" datetime, "last_login" datetime, "last_failed_login" datetime, "date_account_verified" datetime DEFAULT (0), "verification_key" varchar(255), "date_verification_key_sent" datetime, "verification_key_purpose" varchar CHECK( verification_key_purpose IN ('1','2') ), "verification_storage" varchar(100), "create_ip" varchar(255), "date_account_locked" datetime, "date_account_closed" datetime, "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "last_password_changed" datetime, "requires_password_reset" boolean NOT NULL DEFAULT (0), "last_failed_password_reset" datetime, "failed_password_reset_count" integer, "failed_login_count" integer, "current_hashed_refresh_token" varchar, "last_update_ip" varchar(255), "last_updated" datetime, "avatarId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"), CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "public_file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email", "hashedPassword", "is_superuser", "is_active", "phone_number", "phone_verification_code", "phone_verification_code_date_sent", "last_login", "last_failed_login", "date_account_verified", "verification_key", "date_verification_key_sent", "verification_key_purpose", "verification_storage", "create_ip", "date_account_locked", "date_account_closed", "date_joined", "last_password_changed", "requires_password_reset", "last_failed_password_reset", "failed_password_reset_count", "failed_login_count", "current_hashed_refresh_token", "last_update_ip", "last_updated", "avatarId") SELECT "id", "username", "email", "hashedPassword", "is_superuser", "is_active", "phone_number", "phone_verification_code", "phone_verification_code_date_sent", "last_login", "last_failed_login", "date_account_verified", "verification_key", "date_verification_key_sent", "verification_key_purpose", "verification_storage", "create_ip", "date_account_locked", "date_account_closed", "date_joined", "last_password_changed", "requires_password_reset", "last_failed_password_reset", "failed_password_reset_count", "failed_login_count", "current_hashed_refresh_token", "last_update_ip", "last_updated", "avatarId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_oauth_access_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "provider_client_id" varchar(200) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200), "expires_at" datetime, "token_type" varchar(200), "scope" varchar(512), "user_id" integer, CONSTRAINT "FK_48642c0dd9802e0afb4b3091b0c" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_oauth_access_token"("id", "provider", "provider_client_id", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id") SELECT "id", "provider", "provider_client_id", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id" FROM "oauth_access_token"`);
        await queryRunner.query(`DROP TABLE "oauth_access_token"`);
        await queryRunner.query(`ALTER TABLE "temporary_oauth_access_token" RENAME TO "oauth_access_token"`);
        await queryRunner.query(`CREATE TABLE "temporary_household_member" ("user_id" integer PRIMARY KEY NOT NULL, "date_created" datetime NOT NULL, "is_default" boolean, "is_owner" boolean NOT NULL, "description" varchar(40), "household_id" integer, CONSTRAINT "UQ_66898819f7c858a081a9dcff3fc" UNIQUE ("user_id"), CONSTRAINT "REL_66898819f7c858a081a9dcff3f" UNIQUE ("user_id"), CONSTRAINT "FK_66898819f7c858a081a9dcff3fc" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6c47781879f802c55b436b40d46" FOREIGN KEY ("household_id") REFERENCES "household" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_household_member"("user_id", "date_created", "is_default", "is_owner", "description", "household_id") SELECT "user_id", "date_created", "is_default", "is_owner", "description", "household_id" FROM "household_member"`);
        await queryRunner.query(`DROP TABLE "household_member"`);
        await queryRunner.query(`ALTER TABLE "temporary_household_member" RENAME TO "household_member"`);
        await queryRunner.query(`CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "description" text, "proposed_time" time, "executor_user_id" integer, "assigned_user_id" integer, "frequency_id" integer, "household_id" integer, "room_type_id" integer, CONSTRAINT "FK_9b2e45879240b2c619b0d2273cf" FOREIGN KEY ("executor_user_id") REFERENCES "household_member" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f3172a11cafc66aa03fded6cf8c" FOREIGN KEY ("assigned_user_id") REFERENCES "household_member" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b6aa8a02ed2e029ce4f88c7e75a" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b9e4af9a6d7b51f25833a4fa954" FOREIGN KEY ("household_id", "room_type_id") REFERENCES "household_room" ("household_id", "room_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_task"("id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id") SELECT "id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id" FROM "task"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "task"`);
        await queryRunner.query(`CREATE TABLE "temporary_room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, CONSTRAINT "FK_d80dc82d7a65e671a44f72da986" FOREIGN KEY ("frequency_id") REFERENCES "frequency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_14916fc67f6095103147b58d49e" FOREIGN KEY ("task_template_id") REFERENCES "task_template" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2acfaccd722088e2afd3f87fe76" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "room_task"`);
        await queryRunner.query(`DROP TABLE "room_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_room_task" RENAME TO "room_task"`);
        await queryRunner.query(`CREATE TABLE "temporary_household_room" ("household_id" integer NOT NULL, "room_type_id" integer NOT NULL, "custom_name" varchar(60), CONSTRAINT "FK_6b64790e9b3d2bfcc847ff64dee" FOREIGN KEY ("room_type_id") REFERENCES "room_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9ed4adaabb9bed26a5718dbd3d6" FOREIGN KEY ("household_id") REFERENCES "household" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("household_id", "room_type_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_household_room"("household_id", "room_type_id", "custom_name") SELECT "household_id", "room_type_id", "custom_name" FROM "household_room"`);
        await queryRunner.query(`DROP TABLE "household_room"`);
        await queryRunner.query(`ALTER TABLE "temporary_household_room" RENAME TO "household_room"`);
        await queryRunner.query(`CREATE TABLE "temporary_household" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "main_user_id" integer, CONSTRAINT "FK_962e1d1d579613af118620a522b" FOREIGN KEY ("main_user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_household"("id", "name", "main_user_id") SELECT "id", "name", "main_user_id" FROM "household"`);
        await queryRunner.query(`DROP TABLE "household"`);
        await queryRunner.query(`ALTER TABLE "temporary_household" RENAME TO "household"`);
        await queryRunner.query(`CREATE TABLE "temporary_household_member_invitation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "full_name" varchar(100), "date_created" datetime NOT NULL, "date_accepted" datetime, "household_id" integer, "sender_user_id" integer, CONSTRAINT "UQ_5c20dd2cc000411aa800ddd20ce" UNIQUE ("email"), CONSTRAINT "FK_2ee1edf2f82767d9a5aec2f4d4e" FOREIGN KEY ("household_id") REFERENCES "household" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e8c3c9b395875e846dc7d331ba4" FOREIGN KEY ("sender_user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_household_member_invitation"("id", "email", "full_name", "date_created", "date_accepted", "household_id", "sender_user_id") SELECT "id", "email", "full_name", "date_created", "date_accepted", "household_id", "sender_user_id" FROM "household_member_invitation"`);
        await queryRunner.query(`DROP TABLE "household_member_invitation"`);
        await queryRunner.query(`ALTER TABLE "temporary_household_member_invitation" RENAME TO "household_member_invitation"`);
        await queryRunner.query(`CREATE TABLE "temporary_todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "due_date" datetime, "assignee_id" integer, CONSTRAINT "FK_1cc60de54745a935b1c4ca3123b" FOREIGN KEY ("assignee_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_todo"("id", "title", "date_created", "date_completed", "due_date", "assignee_id") SELECT "id", "title", "date_created", "date_completed", "due_date", "assignee_id" FROM "todo"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`ALTER TABLE "temporary_todo" RENAME TO "todo"`);
        await queryRunner.query(`DROP INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
        await queryRunner.query(`DROP INDEX "IDX_3d0a7155eafd75ddba5a701336"`);
        await queryRunner.query(`CREATE TABLE "temporary_role_permission" ("permission_id" integer NOT NULL, "role_id" varchar CHECK( role_id IN ('1','2','8') ) NOT NULL, CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_role_permission"("permission_id", "role_id") SELECT "permission_id", "role_id" FROM "role_permission"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`ALTER TABLE "temporary_role_permission" RENAME TO "role_permission"`);
        await queryRunner.query(`CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "role_permission" ("role_id") `);
        await queryRunner.query(`DROP INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55"`);
        await queryRunner.query(`DROP INDEX "IDX_d0e5815877f7395a198a4cb0a4"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_role" ("role_id" varchar CHECK( role_id IN ('1','2','8') ) NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("role_id", "user_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_role"("role_id", "user_id") SELECT "role_id", "user_id" FROM "user_role"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_role" RENAME TO "user_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d0e5815877f7395a198a4cb0a4"`);
        await queryRunner.query(`DROP INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55"`);
        await queryRunner.query(`ALTER TABLE "user_role" RENAME TO "temporary_user_role"`);
        await queryRunner.query(`CREATE TABLE "user_role" ("role_id" varchar CHECK( role_id IN ('1','2','8') ) NOT NULL, "user_id" integer NOT NULL, PRIMARY KEY ("role_id", "user_id"))`);
        await queryRunner.query(`INSERT INTO "user_role"("role_id", "user_id") SELECT "role_id", "user_id" FROM "temporary_user_role"`);
        await queryRunner.query(`DROP TABLE "temporary_user_role"`);
        await queryRunner.query(`CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `);
        await queryRunner.query(`DROP INDEX "IDX_3d0a7155eafd75ddba5a701336"`);
        await queryRunner.query(`DROP INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
        await queryRunner.query(`ALTER TABLE "role_permission" RENAME TO "temporary_role_permission"`);
        await queryRunner.query(`CREATE TABLE "role_permission" ("permission_id" integer NOT NULL, "role_id" varchar CHECK( role_id IN ('1','2','8') ) NOT NULL, PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`INSERT INTO "role_permission"("permission_id", "role_id") SELECT "permission_id", "role_id" FROM "temporary_role_permission"`);
        await queryRunner.query(`DROP TABLE "temporary_role_permission"`);
        await queryRunner.query(`CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "role_permission" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "todo" RENAME TO "temporary_todo"`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "due_date" datetime, "assignee_id" integer)`);
        await queryRunner.query(`INSERT INTO "todo"("id", "title", "date_created", "date_completed", "due_date", "assignee_id") SELECT "id", "title", "date_created", "date_completed", "due_date", "assignee_id" FROM "temporary_todo"`);
        await queryRunner.query(`DROP TABLE "temporary_todo"`);
        await queryRunner.query(`ALTER TABLE "household_member_invitation" RENAME TO "temporary_household_member_invitation"`);
        await queryRunner.query(`CREATE TABLE "household_member_invitation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "full_name" varchar(100), "date_created" datetime NOT NULL, "date_accepted" datetime, "household_id" integer, "sender_user_id" integer, CONSTRAINT "UQ_5c20dd2cc000411aa800ddd20ce" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "household_member_invitation"("id", "email", "full_name", "date_created", "date_accepted", "household_id", "sender_user_id") SELECT "id", "email", "full_name", "date_created", "date_accepted", "household_id", "sender_user_id" FROM "temporary_household_member_invitation"`);
        await queryRunner.query(`DROP TABLE "temporary_household_member_invitation"`);
        await queryRunner.query(`ALTER TABLE "household" RENAME TO "temporary_household"`);
        await queryRunner.query(`CREATE TABLE "household" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "main_user_id" integer)`);
        await queryRunner.query(`INSERT INTO "household"("id", "name", "main_user_id") SELECT "id", "name", "main_user_id" FROM "temporary_household"`);
        await queryRunner.query(`DROP TABLE "temporary_household"`);
        await queryRunner.query(`ALTER TABLE "household_room" RENAME TO "temporary_household_room"`);
        await queryRunner.query(`CREATE TABLE "household_room" ("household_id" integer NOT NULL, "room_type_id" integer NOT NULL, "custom_name" varchar(60), PRIMARY KEY ("household_id", "room_type_id"))`);
        await queryRunner.query(`INSERT INTO "household_room"("household_id", "room_type_id", "custom_name") SELECT "household_id", "room_type_id", "custom_name" FROM "temporary_household_room"`);
        await queryRunner.query(`DROP TABLE "temporary_household_room"`);
        await queryRunner.query(`ALTER TABLE "room_task" RENAME TO "temporary_room_task"`);
        await queryRunner.query(`CREATE TABLE "room_task" ("room_type_id" integer NOT NULL, "task_id" integer NOT NULL, "relevance" integer, "frequency_id" integer, "task_template_id" integer, PRIMARY KEY ("room_type_id", "task_id"))`);
        await queryRunner.query(`INSERT INTO "room_task"("room_type_id", "task_id", "relevance", "frequency_id", "task_template_id") SELECT "room_type_id", "task_id", "relevance", "frequency_id", "task_template_id" FROM "temporary_room_task"`);
        await queryRunner.query(`DROP TABLE "temporary_room_task"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME TO "temporary_task"`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "description" text, "proposed_time" time, "executor_user_id" integer, "assigned_user_id" integer, "frequency_id" integer, "household_id" integer, "room_type_id" integer)`);
        await queryRunner.query(`INSERT INTO "task"("id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id") SELECT "id", "name", "date_created", "date_completed", "description", "proposed_time", "executor_user_id", "assigned_user_id", "frequency_id", "household_id", "room_type_id" FROM "temporary_task"`);
        await queryRunner.query(`DROP TABLE "temporary_task"`);
        await queryRunner.query(`ALTER TABLE "household_member" RENAME TO "temporary_household_member"`);
        await queryRunner.query(`CREATE TABLE "household_member" ("user_id" integer PRIMARY KEY NOT NULL, "date_created" datetime NOT NULL, "is_default" boolean, "is_owner" boolean NOT NULL, "description" varchar(40), "household_id" integer, CONSTRAINT "UQ_66898819f7c858a081a9dcff3fc" UNIQUE ("user_id"), CONSTRAINT "REL_66898819f7c858a081a9dcff3f" UNIQUE ("user_id"))`);
        await queryRunner.query(`INSERT INTO "household_member"("user_id", "date_created", "is_default", "is_owner", "description", "household_id") SELECT "user_id", "date_created", "is_default", "is_owner", "description", "household_id" FROM "temporary_household_member"`);
        await queryRunner.query(`DROP TABLE "temporary_household_member"`);
        await queryRunner.query(`ALTER TABLE "oauth_access_token" RENAME TO "temporary_oauth_access_token"`);
        await queryRunner.query(`CREATE TABLE "oauth_access_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "provider_client_id" varchar(200) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200), "expires_at" datetime, "token_type" varchar(200), "scope" varchar(512), "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "oauth_access_token"("id", "provider", "provider_client_id", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id") SELECT "id", "provider", "provider_client_id", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id" FROM "temporary_oauth_access_token"`);
        await queryRunner.query(`DROP TABLE "temporary_oauth_access_token"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "hashedPassword" varchar(255) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "phone_number" varchar(12), "phone_verification_code" varchar(8), "phone_verification_code_date_sent" datetime, "last_login" datetime, "last_failed_login" datetime, "date_account_verified" datetime DEFAULT (0), "verification_key" varchar(255), "date_verification_key_sent" datetime, "verification_key_purpose" varchar CHECK( verification_key_purpose IN ('1','2') ), "verification_storage" varchar(100), "create_ip" varchar(255), "date_account_locked" datetime, "date_account_closed" datetime, "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "last_password_changed" datetime, "requires_password_reset" boolean NOT NULL DEFAULT (0), "last_failed_password_reset" datetime, "failed_password_reset_count" integer, "failed_login_count" integer, "current_hashed_refresh_token" varchar, "last_update_ip" varchar(255), "last_updated" datetime, "avatarId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email", "hashedPassword", "is_superuser", "is_active", "phone_number", "phone_verification_code", "phone_verification_code_date_sent", "last_login", "last_failed_login", "date_account_verified", "verification_key", "date_verification_key_sent", "verification_key_purpose", "verification_storage", "create_ip", "date_account_locked", "date_account_closed", "date_joined", "last_password_changed", "requires_password_reset", "last_failed_password_reset", "failed_password_reset_count", "failed_login_count", "current_hashed_refresh_token", "last_update_ip", "last_updated", "avatarId") SELECT "id", "username", "email", "hashedPassword", "is_superuser", "is_active", "phone_number", "phone_verification_code", "phone_verification_code_date_sent", "last_login", "last_failed_login", "date_account_verified", "verification_key", "date_verification_key_sent", "verification_key_purpose", "verification_storage", "create_ip", "date_account_locked", "date_account_closed", "date_joined", "last_password_changed", "requires_password_reset", "last_failed_password_reset", "failed_password_reset_count", "failed_login_count", "current_hashed_refresh_token", "last_update_ip", "last_updated", "avatarId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user_profile" RENAME TO "temporary_user_profile"`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("user_id" integer PRIMARY KEY NOT NULL, "picture_url" varchar(255), "bio" varchar(255), "first_name" varchar(30), "last_name" varchar(30), "date_of_birth" varchar, "locale" varchar(3), CONSTRAINT "UQ_eee360f3bff24af1b6890765201" UNIQUE ("user_id"), CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"))`);
        await queryRunner.query(`INSERT INTO "user_profile"("user_id", "picture_url", "bio", "first_name", "last_name", "date_of_birth", "locale") SELECT "user_id", "picture_url", "bio", "first_name", "last_name", "date_of_birth", "locale" FROM "temporary_user_profile"`);
        await queryRunner.query(`DROP TABLE "temporary_user_profile"`);
        await queryRunner.query(`ALTER TABLE "user_session" RENAME TO "temporary_user_session"`);
        await queryRunner.query(`CREATE TABLE "user_session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_created" datetime NOT NULL, "remote_ip_addr" varchar(255), "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "user_session"("id", "date_created", "remote_ip_addr", "user_id") SELECT "id", "date_created", "remote_ip_addr", "user_id" FROM "temporary_user_session"`);
        await queryRunner.query(`DROP TABLE "temporary_user_session"`);
        await queryRunner.query(`ALTER TABLE "permission" RENAME TO "temporary_permission"`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(120) NOT NULL, "resource_id" integer, "operation_id" integer)`);
        await queryRunner.query(`INSERT INTO "permission"("id", "name", "resource_id", "operation_id") SELECT "id", "name", "resource_id", "operation_id" FROM "temporary_permission"`);
        await queryRunner.query(`DROP TABLE "temporary_permission"`);
        await queryRunner.query(`ALTER TABLE "resource" RENAME TO "temporary_resource"`);
        await queryRunner.query(`CREATE TABLE "resource" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar CHECK( name IN ('user','user-group','permission','todo','household','task','task-template','room-type','frequency','operation','admin','room') ) NOT NULL, "description" varchar(255) NOT NULL, "parent_resource_id" integer, CONSTRAINT "UQ_c8ed18ff47475e2c4a7bf59daa0" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "resource"("id", "name", "description", "parent_resource_id") SELECT "id", "name", "description", "parent_resource_id" FROM "temporary_resource"`);
        await queryRunner.query(`DROP TABLE "temporary_resource"`);
        await queryRunner.query(`DROP INDEX "IDX_d0e5815877f7395a198a4cb0a4"`);
        await queryRunner.query(`DROP INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP INDEX "IDX_3d0a7155eafd75ddba5a701336"`);
        await queryRunner.query(`DROP INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TABLE "household_member_invitation"`);
        await queryRunner.query(`DROP TABLE "household"`);
        await queryRunner.query(`DROP TABLE "household_room"`);
        await queryRunner.query(`DROP TABLE "room_type"`);
        await queryRunner.query(`DROP TABLE "room_task"`);
        await queryRunner.query(`DROP TABLE "task_template"`);
        await queryRunner.query(`DROP TABLE "frequency"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "household_member"`);
        await queryRunner.query(`DROP TABLE "oauth_access_token"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TABLE "user_session"`);
        await queryRunner.query(`DROP TABLE "public_file"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "operation"`);
        await queryRunner.query(`DROP TABLE "resource"`);
    }

}
