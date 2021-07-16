import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { Task } from './task.entity';
import { HouseholdMember } from '../../household/entities/household_member.entity';

@Entity('task_instance')
export class TaskInstance extends BaseEntity {
	@Column('datetime', { name: 'completed_at', nullable: false })
	completedAt: Date;

	@Column('text')
	notes?: string | null;

	@ManyToOne(
		() => HouseholdMember,
		({ executedTasks }) => executedTasks,
		{ nullable: false, onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'executor_user_id', referencedColumnName: 'id' }])
	executorUser: HouseholdMember;

	@ManyToOne(
		() => Task,
		({ instances }) => instances,
		{ nullable: false, onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'task_id', referencedColumnName: 'id' }])
	task: Task;
}
