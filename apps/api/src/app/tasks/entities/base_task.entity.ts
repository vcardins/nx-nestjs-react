import { Column } from 'typeorm';
import { BaseEntity } from '@xapp/api/core';

export class BaseTask extends BaseEntity {
	@Column('varchar', { length: 120 })
	name: string;

	@Column('text', { nullable: true })
	description?: string | null;

	@Column('integer', { name: 'estimated_time_completion', nullable: true })
	estimatedCompletionTime: number | null;

	@Column('integer', { name: 'reward_points', nullable: true })
	rewardPoints: number | null;

	@Column('integer', { name: 'days_of_week', nullable: true })
	daysOfWeek: number | null;

	@Column({ name: 'frequency_id' })
	frequencyId: number;
}
