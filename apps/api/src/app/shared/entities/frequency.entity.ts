import { Column, Entity, OneToMany, BaseEntity } from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';
import { TaskTemplate } from './../../tasks/entities/task_template.entity';
import { IBaseEntity } from '@xapp/api/core';

@Entity('frequency')
export class Frequency extends BaseEntity implements IBaseEntity {
	@Column('int', { primary: true, name: 'id', unique: true })
	id: number;
	@Column('varchar', { name: 'name', length: 20 })
	name: string;

	@Column('int', { name: 'days_interval' })
	daysInterval: number;

	@OneToMany(() => TaskTemplate, ({ frequency }) => frequency)
	tasksTemplates: TaskTemplate[];

	@OneToMany(() => Task, ({ frequency }) => frequency)
	tasks: Task[];
}
