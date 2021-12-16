import { IsNotEmpty, MaxLength } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { Operations } from '@xapp/shared/types';

import { Permission } from '../permission/permission.entity';

@Entity({ name: 'operation' })
export class Operation extends BaseEntity {
	@Column({ length: 100, unique: true, type: 'simple-enum', enum: Operations })
	@IsNotEmpty()
	@MaxLength(100)
	name: Operations;

	@Column({ length: 100 })
	@IsNotEmpty()
	@MaxLength(100)
	description: string = undefined;

	@OneToMany(() => Permission, ({ operation }) => operation)
	permissions: Permission[];

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}

	@BeforeUpdate()
	doBeforeUpdate() {
		this.validate();
	}
}
