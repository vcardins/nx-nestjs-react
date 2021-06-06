import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';

import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	JoinColumn,
} from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { ModuleAction } from '@xapp/shared/types';
import { VerificationKeyPurpose } from '@xapp/shared/auth';
import { Group } from '@xapp/api/access-control';
import { PublicFile } from '@xapp/api/files';

import { LoggedIn } from './logged_in.entity';
import { UserProfile } from './user_profile.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
	@Column({ length: 150, unique: true })
	@MaxLength(150)
	username: string = undefined;

	@Column({ length: 254, unique: true })
	@IsNotEmpty()
	@IsEmail()
	@MaxLength(254)
	email: string = undefined;

	@Column({ length: 255 })
	@MaxLength(128)
	@IsOptional()
	hashedPassword: string = undefined;

	@Column({ name: 'is_superuser', default: false })
	isSuperuser: boolean = undefined;

	@Column({ name: 'is_active', default: false })
	isActive: boolean = undefined;

	@Column({ name: 'phone_number', nullable: true, length: 12 })
	phoneNumber?: string | null;

	@Column({ name: 'phone_verification_code', nullable: true, length: 8 })
	phoneVerificationCode?: string | null;

	@Column({ name: 'phone_verification_code_date_sent', nullable: true })
	phoneVerificationCodeDateSent?: Date = undefined;

	@Column({ name: 'last_login', nullable: true })
	lastLogin: Date = undefined;

	@Column({ name: 'last_failed_login', nullable: true })
	lastFailedLogin: Date = undefined;

	@Column({ name: 'date_account_verified', nullable: true, default: false })
	dateAccountVerified: Date = undefined;

	@Column({ name: 'verification_key', nullable: true, length: 255 })
	verificationKey: string;

	@Column({ name: 'date_verification_key_sent', nullable: true })
	dateVerificationKeySent: Date | null;

	@Column({ name: 'verification_key_purpose', nullable: true, type: 'simple-enum', enum: VerificationKeyPurpose })
	verificationKeyPurpose: VerificationKeyPurpose;

	@Column({ name: 'verification_storage', length: 100, nullable: true })
	verificationStorage: string;

	@Column({ name: 'create_ip', nullable: true, length: 255 })
	createIp: string | null;

	@Column({ name: 'date_account_locked', nullable: true })
	dateAccountLocked: Date | null;

	@Column({ name: 'date_account_closed', nullable: true })
	dateAccountClosed: Date | null;

	@CreateDateColumn({ name: 'date_joined' })
	dateJoined: Date = undefined;

	@Column({ name: 'last_password_changed', nullable: true })
	lastPasswordChanged: Date | null;

	@Column({ name: 'requires_password_reset', default: false })
	requiresPasswordReset: boolean = undefined;

	@Column({ name: 'last_failed_password_reset', nullable: true })
	lastFailedPasswordReset: Date | null;

	@Column({ name: 'failed_password_reset_count', nullable: true })
	failedPasswordResetCount: number;

	@Column({ name: 'failed_login_count', nullable: true })
	failedLoginCount: number;

	@Column({ name: 'current_hashed_refresh_token', nullable: true })
	@Exclude()
	currentHashedRefreshToken?: string;

	@Column({ name: 'last_update_ip', nullable: true, length: 255 })
	lastUpdateIp: string | null;

	@Column({ name: 'last_updated', nullable: true })
	lastUpdated: Date | null;

	@JoinColumn()
	@OneToOne(
		() => PublicFile,
		{
			eager: true,
			nullable: true,
		},
	)
	public avatar?: PublicFile;


	@ManyToMany('Group', { cascade: true })
	@JoinTable({
		// not work on run cli migration:
		name: 'user_groups',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'group_id',
			referencedColumnName: 'id',
		},
	})
	groups: Group[];

	@OneToMany('LoggedIn', 'user', { cascade: true })
	loggedIns: LoggedIn[];

	@OneToOne(() => UserProfile, (userProfile) => userProfile.user, {
		cascade: true,
		eager: true,
	})
	userProfile: UserProfile;

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}

	@BeforeUpdate()
	doBeforeUpdate() {
		this.validate();
	}

	static async createPassword(password: string) {
		return argon2.hash(password);
	}

	async validatePassword(password: string) {
		return argon2.verify(this.hashedPassword, password);
	}

	async setPassword(password: string) {
		if (password) {
			this.hashedPassword = await User.createPassword(password);
		}
		return this;
	}

	checkPermissions(permissions: ModuleAction[]) { // , module: ModuleName
		return (
			(this.groups || []).filter((group) =>
				(group.permissions  || []).filter(
					(permission) => permissions.includes(permission.action), // && permission.module === module,
				).length > 0,
			).length > 0
		);
	}
}
