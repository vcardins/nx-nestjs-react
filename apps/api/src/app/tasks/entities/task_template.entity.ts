import { Column, Entity, BaseEntity, OneToMany } from 'typeorm';
import { CategoryTask } from './category_task.entity';

@Entity('task_template')
export class TaskTemplate extends BaseEntity {
	@Column('int', { primary: true, name: 'id', unique: true })
	id: number;

	@Column('varchar', { name: 'name', length: 255 })
	name: string;

	@Column('text', { name: 'description', nullable: true })
	description: string | null;

	@Column('boolean', { name: 'is_active', nullable: true })
	isActive: boolean | null;

	@Column('int', { name: 'estimated_time', nullable: true })
	estimatedTime: number | null;

	@Column('int', { name: 'reward_points', nullable: true })
	rewardPoints: number | null;

	@OneToMany(
		() => CategoryTask,
		(categoryTask) => categoryTask.task,
	)
	categoryTasks: CategoryTask[];
}
