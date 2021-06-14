/* eslint-disable no-unused-vars */
import { IsNotEmpty, MaxLength } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { Resources } from '@xapp/shared/types';

import { Permission } from '../permission/permission.entity';

@Entity({ name: 'resource' })
export class Resource extends BaseEntity {
	@Column({ length: 100, type: 'simple-enum', enum: Resources, unique: true })
	@IsNotEmpty()
	@MaxLength(100)
	name: Resources;

	@Column({ length: 255 })
	@MaxLength(255)
	description: string;

	@ManyToOne(() => Resource, ({ children }) => children)
	@JoinColumn([{ name: 'parent_resource_id', referencedColumnName: 'id' }])
	parentResource: Resource;

	@OneToMany(() => Resource, ({ parentResource }) => parentResource)
	children: Resource[];

	@OneToMany(() => Permission, ({ resource }) => resource)
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
