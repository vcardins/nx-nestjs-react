import { Column, Entity, JoinColumn, ManyToOne, BeforeInsert, CreateDateColumn } from 'typeorm';

import { User } from '@xapp/api/access-control';
import { BaseEntity, IBaseEntity } from '@xapp/api/core';

@Entity('todo')
export class Todo extends BaseEntity implements IBaseEntity {
	@Column({ name: 'title', length: 255 })
	title: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Column({ name: 'completed_at', nullable: true })
	completedAt?: Date;

	@Column({ name: 'due_date', nullable: true })
	dueDate?: Date;

	@ManyToOne('User', 'todos')
	@JoinColumn([{ name: 'assignee_id', referencedColumnName: 'id' }])
	assignee: User;

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}
}
