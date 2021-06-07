import { BaseEntity } from '@xapp/api/core';
import { Column, Entity, OneToMany } from 'typeorm';
import { CategoryTask } from './category_task.entity';
import { Task } from './task.entity';

@Entity('frequency')
export class Frequency extends BaseEntity {
	@Column('varchar', { name: 'name', length: 20 })
	name: string;

	@Column('integer', { name: 'days_apart' })
	daysApart: number;

	@OneToMany(() => CategoryTask, (categoryTask) => categoryTask.frequency)
	categoryTasks: CategoryTask[];

	@OneToMany(() => Task, (task) => task.frequency)
	tasks: Task[];
}
