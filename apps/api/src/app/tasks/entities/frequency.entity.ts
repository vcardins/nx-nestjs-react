import { Column, Entity, BaseEntity, OneToMany } from 'typeorm';
import { CategoryTask } from './category_task.entity';
import { Task } from './task.entity';

@Entity('frequency')
export class Frequency extends BaseEntity {
	@Column('int', { primary: true, name: 'id', unique: true })
	id: number;

	@Column('varchar', { name: 'name', length: 20 })
	name: string;

	@Column('int', { name: 'days_apart' })
	daysApart: number;

	@OneToMany(
		() => CategoryTask,
		(categoryTask) => categoryTask.frequency,
	)
	categoryTasks: CategoryTask[];

	@OneToMany(() => Task, (task) => task.frequency)
	tasks: Task[];
}
