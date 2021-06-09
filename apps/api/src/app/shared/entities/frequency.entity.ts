import { Column, Entity, OneToMany, BaseEntity } from 'typeorm';

import { RoomTask } from './room_task.entity';
import { Task } from '../../tasks/entities/task.entity';
import { IBaseEntity } from '@xapp/api/core';

@Entity('frequency')
export class Frequency extends BaseEntity implements IBaseEntity {
	@Column('int', { primary: true, name: 'id', unique: true })
	id: number;
	@Column('varchar', { name: 'name', length: 20 })
	name: string;

	@Column('int', { name: 'days_apart' })
	daysApart: number;

	@OneToMany(() => RoomTask, ({ frequency }) => frequency)
	roomTasks: RoomTask[];

	@OneToMany(() => Task, ({ frequency }) => frequency)
	tasks: Task[];
}
