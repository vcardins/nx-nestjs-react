import { IsNotEmpty, MaxLength } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { UserGroup } from '@xapp/shared/types';

import { User } from '@xapp/api/users';
import { Permission } from '../permissions/permission.entity';

@Entity({ name: 'user_group' })
export class Group extends BaseEntity {
	@Column({ type: 'simple-enum', enum: UserGroup, unique: true })
	@IsNotEmpty()
	@MaxLength(100)
	name: UserGroup = undefined;

	@Column({ length: 255, unique: true })
	@IsNotEmpty()
	@MaxLength(100)
	title: string = undefined;

	@ManyToMany('Permission', {
		cascade: ['remove'],
	})
	@JoinTable({
		// not work on run cli migration:
		name: 'user_permissions',
		joinColumn: {
			name: 'user_group_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
	})
	permissions: Permission[];

	@ManyToMany('User')
	@JoinTable({
		// not work on run cli migration:
		name: 'user_groups',
		joinColumn: {
			name: 'user_group_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
	})
	users: User[];

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}

	@BeforeUpdate()
	doBeforeUpdate() {
		this.validate();
	}
}
