import {
	BeforeInsert,
	Column,
	Entity,
	BaseEntity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { User } from '@xapp/api/access-control';
import { getUtcDate } from '@xapp/api/core';

import { Household } from './household.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('household_member')
export class HouseholdMembers extends BaseEntity {
	@Column('integer', { primary: true, name: 'user_id', unique: true })
	userId: number;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('boolean', { name: 'is_default', nullable: true })
	isDefault: boolean | null;

	@Column('boolean', { name: 'is_owner' })
	isOwner: boolean;

	@Column('varchar', { name: 'description', nullable: true, length: 40 })
	description: string | null;

	@OneToOne('User', 'householdMembers')
	@JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
	user: User;

	@ManyToOne(() => Household, (household) => household.members)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@OneToMany(() => Task, (task) => task.executorUser)
	executedTasks: Task[];

	@OneToMany(() => Task, (task) => task.assignedUser)
	assignedTasks: Task[];

	@BeforeInsert()
	doBeforeInsertion() {
		this.dateCreated = getUtcDate();
		// this.validate();
	}
}
