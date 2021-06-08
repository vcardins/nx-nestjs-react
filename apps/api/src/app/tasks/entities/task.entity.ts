import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { HouseholdRoom } from './../../household/entities/household_room.entity';
import { Frequency } from './../../shared/entities/frequency.entity';
import { HouseholdMembers } from './../../household/entities/household_members.entity';
@Entity('task')
export class Task extends BaseEntity {
	@Column('varchar', { name: 'name', length: 60 })
	name: string;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('datetime', { name: 'date_completed', nullable: true })
	dateCompleted: Date | null;

	@Column('text', { name: 'description', nullable: true })
	description: string | null;

	@Column('time', { name: 'proposed_time', nullable: true })
	proposedTime: boolean | null;

	@ManyToOne(
		() => HouseholdMembers,
		({ executedTasks }) => executedTasks,
	)
	@JoinColumn([{ name: 'executor_user_id', referencedColumnName: 'userId' }])
	executorUser?: HouseholdMembers;

	@ManyToOne(
		() => HouseholdMembers,
		({ assignedTasks }) => assignedTasks,
	)
	@JoinColumn([{ name: 'assigned_user_id', referencedColumnName: 'userId' }])
	assignedUser?: HouseholdMembers;

	@ManyToOne(() => Frequency, ({ tasks }) => tasks)
	@JoinColumn([{ name: 'frequency_id', referencedColumnName: 'id' }])
	frequency: Frequency;

	@ManyToOne(() => HouseholdRoom, ({ tasks }) => tasks)
	@JoinColumn([
		{ name: 'household_id', referencedColumnName: 'householdId' },
		{ name: 'room_type_id', referencedColumnName: 'roomTypeId' },
	])
	householdRoom: HouseholdRoom;
}
