import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Unique,
} from 'typeorm';
import { User } from '@xapp/api/access-control';
import { BaseEntity } from '@xapp/api/core';

import { Household } from './household.entity';
import { Task } from '../../tasks/entities/task.entity';
import { HouseholdType } from '@xapp/shared/types';
import { TaskInstance } from '../../tasks/entities/task_instance.entity';

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

	@ManyToOne(
		() => Household,
		({ members }) => members,
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Column('boolean', { name: 'is_default', nullable: true })
	isDefault: boolean | null;

	@Column({ unique: false, type: 'simple-enum', enum: HouseholdType })
	type: HouseholdType;

	@Column('varchar', { name: 'description', nullable: true, length: 255 })
	description?: string | null;

	@OneToMany(
		() => Task,
		({ creatorUser }) => creatorUser,
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn()
	tasksCreators?: Task[];

	@OneToMany(
		() => TaskInstance,
		(task) => task.executorUser,
		{ onDelete: 'CASCADE' },
	)
	executedTasks?: TaskInstance[];

	@OneToMany(
		() => Task,
		(task) => task.assignedUser,
		{ onDelete: 'CASCADE' },
	)
	assignedTasks?: Task[];

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}
}
