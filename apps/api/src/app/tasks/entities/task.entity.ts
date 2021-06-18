import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { HouseholdRoom } from './../../household/entities/household_room.entity';
import { Frequency } from './../../shared/entities/frequency.entity';
import { HouseholdMember } from './../../household/entities/household_member.entity';
import { TaskTemplate } from './task_template.entity';

@Entity('task')
export class Task extends BaseEntity {
	@Column('varchar', { name: 'name', length: 120, nullable: true })
	name: string;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('datetime', { name: 'date_completed', nullable: true })
	dateCompleted: Date | null;

	@Column('datetime', { name: 'due_date', nullable: true })
	dueDate: Date | null;

	@Column('text', { name: 'notes', nullable: true })
	notes?: string | null;

	@Column('integer', { name: 'estimated_completion_time', nullable: true })
	estimatedTime: number | null;

	@ManyToOne(
		() => HouseholdMember,
		({ tasksCreators }) => tasksCreators,
	)
	@JoinColumn([{ name: 'creator_user_id', referencedColumnName: 'id' }])
	creatorUser?: HouseholdMember;

	@ManyToOne(
		() => HouseholdMember,
		({ executedTasks }) => executedTasks,
		{ nullable: true },
	)
	@JoinColumn([{ name: 'executor_user_id', referencedColumnName: 'id' }])
	executorUser?: HouseholdMember;

	@ManyToOne(
		() => HouseholdMember,
		({ assignedTasks }) => assignedTasks,
	)
	@JoinColumn([{ name: 'assigned_user_id', referencedColumnName: 'id' }])
	assignedUser?: HouseholdMember;

	@ManyToOne(() => Frequency, ({ tasks }) => tasks)
	@JoinColumn([{ name: 'frequency_id', referencedColumnName: 'id' }])
	frequency: Frequency;

	@ManyToOne(() => HouseholdRoom, ({ tasks }) => tasks)
	@JoinColumn([
		{ name: 'household_id', referencedColumnName: 'householdId' },
		{ name: 'room_type_id', referencedColumnName: 'roomTypeId' },
	])
	householdRoom: HouseholdRoom;

	@ManyToOne(() => TaskTemplate, ({ tasks }) => tasks, { nullable: true })
	@JoinColumn([{ name: 'task_template_id', referencedColumnName: 'id' }])
	template: TaskTemplate;
}
