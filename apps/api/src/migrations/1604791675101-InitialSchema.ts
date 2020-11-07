import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1604791675101 implements MigrationInterface {
	name = 'InitialSchema1604791675101';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "public_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "key" varchar NOT NULL)',
		);
		await queryRunner.query(
			'CREATE TABLE "user_profile" ("user_id" integer PRIMARY KEY NOT NULL, "picture_url" varchar(255), "bio" varchar(255), "first_name" varchar(30), "last_name" varchar(30), "date_of_birth" varchar, "locale" varchar(3), CONSTRAINT "UQ_eee360f3bff24af1b6890765201" UNIQUE ("user_id"), CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "hashedPassword" varchar(255) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "phone_number" varchar(12), "phone_verification_code" varchar(8), "phone_verification_code_date_sent" datetime, "last_login" datetime, "last_failed_login" datetime, "date_account_verified" datetime DEFAULT (0), "verification_key" varchar(255), "date_verification_key_sent" datetime, "verification_key_purpose" varchar CHECK( verification_key_purpose IN (\'1\',\'2\') ), "verification_storage" varchar(100), "create_ip" varchar(255), "date_account_locked" datetime, "date_account_closed" datetime, "date_joined" datetime NOT NULL DEFAULT (datetime(\'now\')), "last_password_changed" datetime, "requires_password_reset" boolean NOT NULL DEFAULT (0), "last_failed_password_reset" datetime, "failed_password_reset_count" integer, "failed_login_count" integer, "current_hashed_refresh_token" varchar, "last_update_ip" varchar(255), "last_updated" datetime, "avatarId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"))',
		);
		await queryRunner.query(
			'CREATE TABLE "group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar CHECK( name IN (\'admin\',\'staff\',\'user\',\'\') ) NOT NULL, "title" varchar(255) NOT NULL, CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" UNIQUE ("name"), CONSTRAINT "UQ_326ae60c2267f5780f1ecc09fac" UNIQUE ("title"))',
		);
		await queryRunner.query(
			'CREATE TABLE "permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "action" varchar CHECK( action IN (\'1\',\'2\',\'3\',\'4\',\'5\',\'6\') ) NOT NULL, "title" varchar(255) NOT NULL)',
		);
		await queryRunner.query(
			'CREATE TABLE "logged_in" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_created" datetime NOT NULL, "remote_ip_addr" varchar(255), "user_id" integer)',
		);
		await queryRunner.query(
			'CREATE TABLE "oauth_tokens_access_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "provider_client_id" varchar(200) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200), "expires_at" datetime, "token_type" varchar(200), "scope" varchar(512), "user_id" integer)',
		);
		await queryRunner.query(
			'CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "due_date" datetime, "assignee_id" integer)',
		);
		await queryRunner.query(
			'CREATE TABLE "user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, PRIMARY KEY ("user_id", "group_id"))',
		);
		await queryRunner.query('CREATE INDEX "IDX_95bf94c61795df25a515435010" ON "user_groups" ("user_id") ');
		await queryRunner.query('CREATE INDEX "IDX_4c5f2c23c34f3921fbad2cd394" ON "user_groups" ("group_id") ');
		await queryRunner.query(
			'CREATE TABLE "group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, PRIMARY KEY ("group_id", "permission_id"))',
		);
		await queryRunner.query('CREATE INDEX "IDX_3924be6485a5b5d0d2fe1a94c0" ON "group_permissions" ("group_id") ');
		await queryRunner.query(
			'CREATE INDEX "IDX_7514fdc446a1fdcf5b2d39cda6" ON "group_permissions" ("permission_id") ',
		);
		await queryRunner.query(
			'CREATE TABLE "temporary_user_profile" ("user_id" integer PRIMARY KEY NOT NULL, "picture_url" varchar(255), "bio" varchar(255), "first_name" varchar(30), "last_name" varchar(30), "date_of_birth" varchar, "locale" varchar(3), CONSTRAINT "UQ_eee360f3bff24af1b6890765201" UNIQUE ("user_id"), CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"), CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)',
		);
		await queryRunner.query(
			'INSERT INTO "temporary_user_profile"("user_id", "picture_url", "bio", "first_name", "last_name", "date_of_birth", "locale") SELECT "user_id", "picture_url", "bio", "first_name", "last_name", "date_of_birth", "locale" FROM "user_profile"',
		);
		await queryRunner.query('DROP TABLE "user_profile"');
		await queryRunner.query('ALTER TABLE "temporary_user_profile" RENAME TO "user_profile"');
		await queryRunner.query(
			'CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "hashedPassword" varchar(255) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "phone_number" varchar(12), "phone_verification_code" varchar(8), "phone_verification_code_date_sent" datetime, "last_login" datetime, "last_failed_login" datetime, "date_account_verified" datetime DEFAULT (0), "verification_key" varchar(255), "date_verification_key_sent" datetime, "verification_key_purpose" varchar CHECK( verification_key_purpose IN (\'1\',\'2\') ), "verification_storage" varchar(100), "create_ip" varchar(255), "date_account_locked" datetime, "date_account_closed" datetime, "date_joined" datetime NOT NULL DEFAULT (datetime(\'now\')), "last_password_changed" datetime, "requires_password_reset" boolean NOT NULL DEFAULT (0), "last_failed_password_reset" datetime, "failed_password_reset_count" integer, "failed_login_count" integer, "current_hashed_refresh_token" varchar, "last_update_ip" varchar(255), "last_updated" datetime, "avatarId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"), CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "public_file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)',
		);
		await queryRunner.query(
			'INSERT INTO "temporary_user"("id", "username", "email", "hashedPassword", "is_superuser", "is_active", "phone_number", "phone_verification_code", "phone_verification_code_date_sent", "last_login", "last_failed_login", "date_account_verified", "verification_key", "date_verification_key_sent", "verification_key_purpose", "verification_storage", "create_ip", "date_account_locked", "date_account_closed", "date_joined", "last_password_changed", "requires_password_reset", "last_failed_password_reset", "failed_password_reset_count", "failed_login_count", "current_hashed_refresh_token", "last_update_ip", "last_updated", "avatarId") SELECT "id", "username", "email", "hashedPassword", "is_superuser", "is_active", "phone_number", "phone_verification_code", "phone_verification_code_date_sent", "last_login", "last_failed_login", "date_account_verified", "verification_key", "date_verification_key_sent", "verification_key_purpose", "verification_storage", "create_ip", "date_account_locked", "date_account_closed", "date_joined", "last_password_changed", "requires_password_reset", "last_failed_password_reset", "failed_password_reset_count", "failed_login_count", "current_hashed_refresh_token", "last_update_ip", "last_updated", "avatarId" FROM "user"',
		);
		await queryRunner.query('DROP TABLE "user"');
		await queryRunner.query('ALTER TABLE "temporary_user" RENAME TO "user"');
		await queryRunner.query(
			'CREATE TABLE "temporary_logged_in" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_created" datetime NOT NULL, "remote_ip_addr" varchar(255), "user_id" integer, CONSTRAINT "FK_bbf576428a82ba1a403605589a8" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)',
		);
		await queryRunner.query(
			'INSERT INTO "temporary_logged_in"("id", "date_created", "remote_ip_addr", "user_id") SELECT "id", "date_created", "remote_ip_addr", "user_id" FROM "logged_in"',
		);
		await queryRunner.query('DROP TABLE "logged_in"');
		await queryRunner.query('ALTER TABLE "temporary_logged_in" RENAME TO "logged_in"');
		await queryRunner.query(
			'CREATE TABLE "temporary_oauth_tokens_access_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "provider_client_id" varchar(200) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200), "expires_at" datetime, "token_type" varchar(200), "scope" varchar(512), "user_id" integer, CONSTRAINT "FK_92c756a03810fca6fa5b4f2256a" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)',
		);
		await queryRunner.query(
			'INSERT INTO "temporary_oauth_tokens_access_token"("id", "provider", "provider_client_id", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id") SELECT "id", "provider", "provider_client_id", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id" FROM "oauth_tokens_access_token"',
		);
		await queryRunner.query('DROP TABLE "oauth_tokens_access_token"');
		await queryRunner.query(
			'ALTER TABLE "temporary_oauth_tokens_access_token" RENAME TO "oauth_tokens_access_token"',
		);
		await queryRunner.query(
			'CREATE TABLE "temporary_todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "due_date" datetime, "assignee_id" integer, CONSTRAINT "FK_1cc60de54745a935b1c4ca3123b" FOREIGN KEY ("assignee_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)',
		);
		await queryRunner.query(
			'INSERT INTO "temporary_todo"("id", "title", "date_created", "date_completed", "due_date", "assignee_id") SELECT "id", "title", "date_created", "date_completed", "due_date", "assignee_id" FROM "todo"',
		);
		await queryRunner.query('DROP TABLE "todo"');
		await queryRunner.query('ALTER TABLE "temporary_todo" RENAME TO "todo"');
		await queryRunner.query('DROP INDEX "IDX_95bf94c61795df25a515435010"');
		await queryRunner.query('DROP INDEX "IDX_4c5f2c23c34f3921fbad2cd394"');
		await queryRunner.query(
			'CREATE TABLE "temporary_user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, CONSTRAINT "FK_95bf94c61795df25a5154350102" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("user_id", "group_id"))',
		);
		await queryRunner.query(
			'INSERT INTO "temporary_user_groups"("user_id", "group_id") SELECT "user_id", "group_id" FROM "user_groups"',
		);
		await queryRunner.query('DROP TABLE "user_groups"');
		await queryRunner.query('ALTER TABLE "temporary_user_groups" RENAME TO "user_groups"');
		await queryRunner.query('CREATE INDEX "IDX_95bf94c61795df25a515435010" ON "user_groups" ("user_id") ');
		await queryRunner.query('CREATE INDEX "IDX_4c5f2c23c34f3921fbad2cd394" ON "user_groups" ("group_id") ');
		await queryRunner.query('DROP INDEX "IDX_3924be6485a5b5d0d2fe1a94c0"');
		await queryRunner.query('DROP INDEX "IDX_7514fdc446a1fdcf5b2d39cda6"');
		await queryRunner.query(
			'CREATE TABLE "temporary_group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "FK_3924be6485a5b5d0d2fe1a94c08" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_7514fdc446a1fdcf5b2d39cda60" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("group_id", "permission_id"))',
		);
		await queryRunner.query(
			'INSERT INTO "temporary_group_permissions"("group_id", "permission_id") SELECT "group_id", "permission_id" FROM "group_permissions"',
		);
		await queryRunner.query('DROP TABLE "group_permissions"');
		await queryRunner.query('ALTER TABLE "temporary_group_permissions" RENAME TO "group_permissions"');
		await queryRunner.query('CREATE INDEX "IDX_3924be6485a5b5d0d2fe1a94c0" ON "group_permissions" ("group_id") ');
		await queryRunner.query(
			'CREATE INDEX "IDX_7514fdc446a1fdcf5b2d39cda6" ON "group_permissions" ("permission_id") ',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP INDEX "IDX_7514fdc446a1fdcf5b2d39cda6"');
		await queryRunner.query('DROP INDEX "IDX_3924be6485a5b5d0d2fe1a94c0"');
		await queryRunner.query('ALTER TABLE "group_permissions" RENAME TO "temporary_group_permissions"');
		await queryRunner.query(
			'CREATE TABLE "group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, PRIMARY KEY ("group_id", "permission_id"))',
		);
		await queryRunner.query(
			'INSERT INTO "group_permissions"("group_id", "permission_id") SELECT "group_id", "permission_id" FROM "temporary_group_permissions"',
		);
		await queryRunner.query('DROP TABLE "temporary_group_permissions"');
		await queryRunner.query(
			'CREATE INDEX "IDX_7514fdc446a1fdcf5b2d39cda6" ON "group_permissions" ("permission_id") ',
		);
		await queryRunner.query('CREATE INDEX "IDX_3924be6485a5b5d0d2fe1a94c0" ON "group_permissions" ("group_id") ');
		await queryRunner.query('DROP INDEX "IDX_4c5f2c23c34f3921fbad2cd394"');
		await queryRunner.query('DROP INDEX "IDX_95bf94c61795df25a515435010"');
		await queryRunner.query('ALTER TABLE "user_groups" RENAME TO "temporary_user_groups"');
		await queryRunner.query(
			'CREATE TABLE "user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, PRIMARY KEY ("user_id", "group_id"))',
		);
		await queryRunner.query(
			'INSERT INTO "user_groups"("user_id", "group_id") SELECT "user_id", "group_id" FROM "temporary_user_groups"',
		);
		await queryRunner.query('DROP TABLE "temporary_user_groups"');
		await queryRunner.query('CREATE INDEX "IDX_4c5f2c23c34f3921fbad2cd394" ON "user_groups" ("group_id") ');
		await queryRunner.query('CREATE INDEX "IDX_95bf94c61795df25a515435010" ON "user_groups" ("user_id") ');
		await queryRunner.query('ALTER TABLE "todo" RENAME TO "temporary_todo"');
		await queryRunner.query(
			'CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "date_created" datetime NOT NULL, "date_completed" datetime, "due_date" datetime, "assignee_id" integer)',
		);
		await queryRunner.query(
			'INSERT INTO "todo"("id", "title", "date_created", "date_completed", "due_date", "assignee_id") SELECT "id", "title", "date_created", "date_completed", "due_date", "assignee_id" FROM "temporary_todo"',
		);
		await queryRunner.query('DROP TABLE "temporary_todo"');
		await queryRunner.query(
			'ALTER TABLE "oauth_tokens_access_token" RENAME TO "temporary_oauth_tokens_access_token"',
		);
		await queryRunner.query(
			'CREATE TABLE "oauth_tokens_access_token" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "provider_client_id" varchar(200) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200), "expires_at" datetime, "token_type" varchar(200), "scope" varchar(512), "user_id" integer)',
		);
		await queryRunner.query(
			'INSERT INTO "oauth_tokens_access_token"("id", "provider", "provider_client_id", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id") SELECT "id", "provider", "provider_client_id", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id" FROM "temporary_oauth_tokens_access_token"',
		);
		await queryRunner.query('DROP TABLE "temporary_oauth_tokens_access_token"');
		await queryRunner.query('ALTER TABLE "logged_in" RENAME TO "temporary_logged_in"');
		await queryRunner.query(
			'CREATE TABLE "logged_in" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_created" datetime NOT NULL, "remote_ip_addr" varchar(255), "user_id" integer)',
		);
		await queryRunner.query(
			'INSERT INTO "logged_in"("id", "date_created", "remote_ip_addr", "user_id") SELECT "id", "date_created", "remote_ip_addr", "user_id" FROM "temporary_logged_in"',
		);
		await queryRunner.query('DROP TABLE "temporary_logged_in"');
		await queryRunner.query('ALTER TABLE "user" RENAME TO "temporary_user"');
		await queryRunner.query(
			'CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "hashedPassword" varchar(255) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "phone_number" varchar(12), "phone_verification_code" varchar(8), "phone_verification_code_date_sent" datetime, "last_login" datetime, "last_failed_login" datetime, "date_account_verified" datetime DEFAULT (0), "verification_key" varchar(255), "date_verification_key_sent" datetime, "verification_key_purpose" varchar CHECK( verification_key_purpose IN (\'1\',\'2\') ), "verification_storage" varchar(100), "create_ip" varchar(255), "date_account_locked" datetime, "date_account_closed" datetime, "date_joined" datetime NOT NULL DEFAULT (datetime(\'now\')), "last_password_changed" datetime, "requires_password_reset" boolean NOT NULL DEFAULT (0), "last_failed_password_reset" datetime, "failed_password_reset_count" integer, "failed_login_count" integer, "current_hashed_refresh_token" varchar, "last_update_ip" varchar(255), "last_updated" datetime, "avatarId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"))',
		);
		await queryRunner.query(
			'INSERT INTO "user"("id", "username", "email", "hashedPassword", "is_superuser", "is_active", "phone_number", "phone_verification_code", "phone_verification_code_date_sent", "last_login", "last_failed_login", "date_account_verified", "verification_key", "date_verification_key_sent", "verification_key_purpose", "verification_storage", "create_ip", "date_account_locked", "date_account_closed", "date_joined", "last_password_changed", "requires_password_reset", "last_failed_password_reset", "failed_password_reset_count", "failed_login_count", "current_hashed_refresh_token", "last_update_ip", "last_updated", "avatarId") SELECT "id", "username", "email", "hashedPassword", "is_superuser", "is_active", "phone_number", "phone_verification_code", "phone_verification_code_date_sent", "last_login", "last_failed_login", "date_account_verified", "verification_key", "date_verification_key_sent", "verification_key_purpose", "verification_storage", "create_ip", "date_account_locked", "date_account_closed", "date_joined", "last_password_changed", "requires_password_reset", "last_failed_password_reset", "failed_password_reset_count", "failed_login_count", "current_hashed_refresh_token", "last_update_ip", "last_updated", "avatarId" FROM "temporary_user"',
		);
		await queryRunner.query('DROP TABLE "temporary_user"');
		await queryRunner.query('ALTER TABLE "user_profile" RENAME TO "temporary_user_profile"');
		await queryRunner.query(
			'CREATE TABLE "user_profile" ("user_id" integer PRIMARY KEY NOT NULL, "picture_url" varchar(255), "bio" varchar(255), "first_name" varchar(30), "last_name" varchar(30), "date_of_birth" varchar, "locale" varchar(3), CONSTRAINT "UQ_eee360f3bff24af1b6890765201" UNIQUE ("user_id"), CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"))',
		);
		await queryRunner.query(
			'INSERT INTO "user_profile"("user_id", "picture_url", "bio", "first_name", "last_name", "date_of_birth", "locale") SELECT "user_id", "picture_url", "bio", "first_name", "last_name", "date_of_birth", "locale" FROM "temporary_user_profile"',
		);
		await queryRunner.query('DROP TABLE "temporary_user_profile"');
		await queryRunner.query('DROP INDEX "IDX_7514fdc446a1fdcf5b2d39cda6"');
		await queryRunner.query('DROP INDEX "IDX_3924be6485a5b5d0d2fe1a94c0"');
		await queryRunner.query('DROP TABLE "group_permissions"');
		await queryRunner.query('DROP INDEX "IDX_4c5f2c23c34f3921fbad2cd394"');
		await queryRunner.query('DROP INDEX "IDX_95bf94c61795df25a515435010"');
		await queryRunner.query('DROP TABLE "user_groups"');
		await queryRunner.query('DROP TABLE "todo"');
		await queryRunner.query('DROP TABLE "oauth_tokens_access_token"');
		await queryRunner.query('DROP TABLE "logged_in"');
		await queryRunner.query('DROP TABLE "permission"');
		await queryRunner.query('DROP TABLE "group"');
		await queryRunner.query('DROP TABLE "user"');
		await queryRunner.query('DROP TABLE "user_profile"');
		await queryRunner.query('DROP TABLE "public_file"');
	}
}
