import { IsNotEmpty, MaxLength } from 'class-validator';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@xapp/api/core';
import { Role } from '../role/role.entity';
import { Resource } from '../resource/resource.entity';
import { Operation } from '../operation/operation.entity';

@Entity({ name: 'permission' })
export class Permission extends BaseEntity {
	@Column({ length: 120 })
	@IsNotEmpty()
	@MaxLength(120)
	name: string;

	@ManyToMany(() => Role)
	@JoinTable({
		name: 'role_permission',
		joinColumn: {
			name: 'permission_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id',
		},
	})
	roles: Role[];

	@ManyToOne(() => Resource, (resource) => resource.permissions)
	@JoinColumn([{ name: 'resource_id', referencedColumnName: 'id' }])
	resource: Resource;

	@ManyToOne(() => Operation, (operation) => operation.permissions)
	@JoinColumn([{ name: 'operation_id', referencedColumnName: 'id' }])
	operation: Operation;

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}

	@BeforeUpdate()
	doBeforeUpdate() {
		this.validate();
	}
}
