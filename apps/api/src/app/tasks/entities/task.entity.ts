import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { HouseholdRoom } from './../../household/entities/household_room.entity';
import { Frequency } from './../../shared/entities/frequency.entity';
import { HouseholdMember } from './../../household/entities/household_member.entity';
import { TaskTemplate } from './task_template.entity';
import { TaskInstance } from './task_instance.entity';

@Entity('task')
export class Task extends BaseEntity {
	@Column('varchar', { name: 'name', length: 120, nullable: true })
	name: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Column('datetime', { name: 'last_executed_at', nullable: true })
	lastExecutedAt: Date | null;

	@Column('text', { name: 'notes', nullable: true })
	notes?: string | null;

	@Column('integer', { name: 'estimated_completion_time', nullable: true })
	estimatedCompletionTime: number | null;

	@Column({ name: 'creator_user_id' })
	creatorUserId: number;

	@ManyToOne(
		() => HouseholdMember,
		({ tasksCreators }) => tasksCreators,
	)
	@JoinColumn([{ name: 'creator_user_id', referencedColumnName: 'id' }])
	creatorUser?: HouseholdMember;

	@Column({ name: 'assigned_user_id' })
	assignedUserId: number;

	@ManyToOne(
		() => HouseholdMember,
		({ assignedTasks }) => assignedTasks,
	)
	@JoinColumn([{ name: 'assigned_user_id', referencedColumnName: 'id' }])
	assignedUser?: HouseholdMember;

	@Column({ name: 'frequency_id' })
	frequencyId: number;

	@ManyToOne(
		() => Frequency,
		({ tasks }) => tasks,
		{ nullable: false },
	)
	@JoinColumn([{ name: 'frequency_id', referencedColumnName: 'id' }])
	frequency: Frequency;

	@Column({ name: 'household_room_id' })
	householdRoomId: number;

	@ManyToOne(
		() => HouseholdRoom,
		({ tasks }) => tasks,
		{ onDelete: 'CASCADE', nullable: false },
	)
	@JoinColumn([{ name: 'household_room_id', referencedColumnName: 'id' }])
	householdRoom: HouseholdRoom;

	@Column({ name: 'task_template_id' })
	templateId: number;

	@ManyToOne(
		() => TaskTemplate,
		({ tasks }) => tasks, { onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'task_template_id', referencedColumnName: 'id' }])
	template: TaskTemplate;

	@OneToMany(
		() => TaskInstance,
		({ task }) => task,
		{ cascade: true, onDelete: 'CASCADE' },
	)
	instances: TaskInstance[];
}
