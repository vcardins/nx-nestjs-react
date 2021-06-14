import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, BaseEntity } from 'typeorm';

import { UserRoles } from '@xapp/shared/types';

import {  } from '@xapp/api/core';
import { User } from '@xapp/api/users';

import { Permission } from '../permission/permission.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
	@Column({ primary: true, type: 'simple-enum', enum: UserRoles, unique: true, nullable: false })
	@IsNotEmpty()
	id: UserRoles;

	@Column({ length: 100, unique: true })
	@IsNotEmpty()
	@MaxLength(100)
	name: string;

	@ManyToMany(() => Permission, {
		cascade: ['remove'],
	})
	@JoinTable({
		// not work on run cli migration:
		name: 'role_permission',
		joinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
	})
	permissions: Permission[];

	@ManyToMany(() => User)
	@JoinTable({
		// not work on run cli migration:
		name: 'user_role',
		joinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
	})
	users: User[];
}
