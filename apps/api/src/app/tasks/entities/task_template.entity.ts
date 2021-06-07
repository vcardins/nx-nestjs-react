import { BaseEntity } from '@xapp/api/core';
import { Column, Entity, OneToMany } from 'typeorm';
import { CategoryTask } from './category_task.entity';

@Entity('task_template')
export class TaskTemplate extends BaseEntity {
	@Column('varchar', { name: 'name', length: 255 })
	name: string;

	@Column('text', { name: 'description', nullable: true })
	description: string | null;

	@Column('boolean', { name: 'is_active', nullable: true })
	isActive: boolean | null;

	@Column('integer', { name: 'estimated_time', nullable: true })
	estimatedTime: number | null;

	@Column('integer', { name: 'reward_points', nullable: true })
	rewardPoints: number | null;

	@OneToMany(() => CategoryTask, (categoryTask) => categoryTask.taskTemplate)
	categoryTasks: CategoryTask[];
}
