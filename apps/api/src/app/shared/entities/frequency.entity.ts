import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';

import { RoomTask } from './room_task.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('frequency')
export class Frequency extends BaseEntity {
	@Column('varchar', { name: 'name', length: 20 })
	name: string;

	@Column('int', { name: 'days_apart' })
	daysApart: number;

	@OneToMany(() => RoomTask, ({ frequency }) => frequency)
	roomTasks: RoomTask[];

	@OneToMany(() => Task, ({ frequency }) => frequency)
	tasks: Task[];
}
