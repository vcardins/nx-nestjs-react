import { Column, Entity, JoinColumn, ManyToOne, BeforeInsert } from 'typeorm';

import { User } from '@xapp/api/access-control';
import { BaseEntity, getUtcDate, IBaseEntity } from '@xapp/api/core';

@Entity('todo')
export class Todo extends BaseEntity implements IBaseEntity {
	@Column({ name: 'title', length: 255 })
	title: string;

	@Column({ name: 'date_created' })
	dateCreated: Date;

	@Column({ name: 'date_completed', nullable: true })
	dateCompleted?: Date;

	@Column({ name: 'due_date', nullable: true })
	dueDate?: Date;

	@ManyToOne('User', 'todos')
	@JoinColumn([{ name: 'assignee_id', referencedColumnName: 'id' }])
	assignee: User;

	@BeforeInsert()
	doBeforeInsertion() {
		this.dateCreated = getUtcDate();
		this.validate();
	}
}
