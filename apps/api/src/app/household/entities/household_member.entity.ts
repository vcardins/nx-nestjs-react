import {
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Unique,
} from 'typeorm';
import { User } from '@xapp/api/access-control';
import { BaseEntity, getUtcDate } from '@xapp/api/core';

import { Household } from './household.entity';
import { Task } from '../../tasks/entities/task.entity';
import { HouseholdType } from '@xapp/shared/types';

@Entity('household_member')
@Unique('index_household_member', ['userId', 'householdId'])
export class HouseholdMember extends BaseEntity {
	@Column({ name: 'user_id' })
	userId: number;

	@Column({ name: 'household_id' })
	householdId: number;

	@ManyToOne(() => User, 'householdMembers')
	@JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
	user: User;

	@ManyToOne(() => Household, ({ members }) => members)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('boolean', { name: 'is_default', nullable: true })
	isDefault: boolean | null;

	@Column({ unique: false, type: 'simple-enum', enum: HouseholdType })
	type: HouseholdType;

	@Column('varchar', { name: 'description', nullable: true, length: 255 })
	description?: string | null;

	@OneToMany(
		() => Task,
		(task) => task.creatorUser,
		{ cascade: true },
	)
	tasksCreators?: Task[];

	@OneToMany(
		() => Task,
		(task) => task.executorUser,
		{ cascade: true },
	)
	executedTasks?: Task[];

	@OneToMany(
		() => Task,
		(task) => task.assignedUser,
		{ cascade: true },
	)
	assignedTasks?: Task[];

	@BeforeInsert()
	doBeforeInsertion() {
		this.dateCreated = getUtcDate();
	}
}
