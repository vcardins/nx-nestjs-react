import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { RoomType } from '../../shared/entities/room_type.entity';
import { Frequency } from '../../shared/entities/frequency.entity';
import { Task } from './task.entity';

@Entity('task_template')
export class TaskTemplate extends BaseEntity {
	@Column('varchar', { name: 'name', length: 120 })
	name: string;

	@Column('text', { name: 'notes', nullable: true })
	notes?: string | null;

	@Column('boolean', { name: 'is_active', nullable: true })
	isActive: boolean | null;

	@Column('integer', { name: 'estimated_time', nullable: true })
	estimatedTime: number | null;

	@Column('integer', { name: 'reward_points', nullable: true })
	rewardPoints: number | null;

	@ManyToOne(() => RoomType, ({ tasksTemplates }) => tasksTemplates)
	@JoinColumn([{ name: 'room_type_id', referencedColumnName: 'id' }])
	roomType: RoomType;

	@ManyToOne(() => Frequency, ({ tasksTemplates }) => tasksTemplates)
	@JoinColumn([{ name: 'frequency_id', referencedColumnName: 'id' }])
	frequency: Frequency;

	@OneToMany(() => Task, ({ template }) => template, { onDelete: 'CASCADE' })
	tasks: Task[];
}
