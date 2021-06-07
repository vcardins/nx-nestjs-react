import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Frequency } from './frequency.entity';
import { HouseholdMembers } from '../../household/entities/household_members.entity';
import { HouseholdCategory } from '../../household/entities/household_category.entity';
import { BaseEntity } from '@xapp/api/core';

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
		(householdMembers) => householdMembers.executedTasks,
	)
	@JoinColumn([{ name: 'executor_user_id', referencedColumnName: 'userId' }])
	executorUser?: HouseholdMembers;

	@ManyToOne(
		() => HouseholdMembers,
		(householdMembers) => householdMembers.assignedTasks,
	)
	@JoinColumn([{ name: 'assigned_user_id', referencedColumnName: 'userId' }])
	assignedUser?: HouseholdMembers;

	@ManyToOne(() => Frequency, (frequency) => frequency.tasks)
	@JoinColumn([{ name: 'frequency_id', referencedColumnName: 'id' }])
	frequency: Frequency;

	@ManyToOne(() => HouseholdCategory, (householdCategory) => householdCategory.tasks)
	@JoinColumn([
		{ name: 'household_id', referencedColumnName: 'householdId' },
		{ name: 'category_id', referencedColumnName: 'categoryId' },
	])
	householdCategory: HouseholdCategory;
}
