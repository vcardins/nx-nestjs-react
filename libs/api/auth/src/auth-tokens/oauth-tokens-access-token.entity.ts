import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { User } from '@xapp/api/access-control';

@Entity({ name: 'oauth_access_token' })
export class OauthTokensAccessToken extends BaseEntity {
	@Column({ length: 20 })
	@IsNotEmpty()
	@MaxLength(20)
	provider: string = undefined;

	@Column({ name: 'provider_client_id', length: 200 })
	@IsNotEmpty()
	@MaxLength(200)
	providerClientId: string = undefined;

	@CreateDateColumn({ name: 'granted_at' })
	grantedAt: Date = undefined;

	@Column({ name: 'access_token', length: 500 })
	@IsNotEmpty()
	@MaxLength(500)
	accessToken: string = undefined;

	@Column({ name: 'refresh_token', length: 200, nullable: true })
	@MaxLength(200)
	@IsOptional()
	refreshToken: string = undefined;

	@Column({ type: Date, name: 'expires_at', nullable: true })
	expiresAt: Date = undefined;

	@Column({ name: 'token_type', length: 200, nullable: true })
	@MaxLength(200)
	@IsOptional()
	tokenType: string = undefined;

	@Column({ length: 512, nullable: true })
	@MaxLength(512)
	@IsOptional()
	scope: string = undefined;

	@ManyToOne('User', { eager: true })
	@IsNotEmpty()
	@JoinColumn({ name: 'user_id' })
	user: User = undefined;

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}

	@BeforeUpdate()
	doBeforeUpdate() {
		this.validate();
	}
}
