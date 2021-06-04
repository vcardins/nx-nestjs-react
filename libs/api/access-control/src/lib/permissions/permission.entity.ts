/* eslint-disable no-unused-vars */
import { IsNotEmpty, MaxLength } from 'class-validator';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
} from 'typeorm';
import { BaseEntity } from '@xapp/api/core';
import { ModuleAction, ModuleName } from '@xapp/shared';

import { Group } from '../groups/group.entity';

@Entity({ name: 'permission' })
export class Permission extends BaseEntity {
	module: ModuleName;

	@Column({ name: 'action', type: 'simple-enum', enum: ModuleAction })
	@IsNotEmpty()
	action: ModuleAction;

	@Column({ length: 255 })
	@IsNotEmpty()
	@MaxLength(255)
	title: string = undefined;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@ManyToMany((type) => Group)
	@JoinTable({
		// not work on run cli migration:
		name: 'group_permissions',
		joinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'group_id',
			referencedColumnName: 'id',
		},
	})
	groups: Group[];

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}

	@BeforeUpdate()
	doBeforeUpdate() {
		this.validate();
	}
}
