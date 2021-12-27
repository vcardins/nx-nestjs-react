import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { RoomType } from '../../shared/entities/room_type.entity';
import { Frequency } from '../../shared/entities/frequency.entity';
import { Task } from './task.entity';
import { TaskTemplateTranslation } from '../../shared/entities/task_template_translation.entity';
import { BaseTask } from './base_task.entity';

@Entity('task_template')
export class TaskTemplate extends BaseTask {
	@Column('boolean', { name: 'is_active', nullable: true })
	isActive: boolean | null;

	@ManyToOne(
		() => RoomType,
		({ tasksTemplates }) => tasksTemplates,
	)
	@JoinColumn([{ name: 'room_type_id', referencedColumnName: 'id' }])
	roomType: RoomType;

	@ManyToOne(
		() => Frequency,
		({ tasksTemplates }) => tasksTemplates,
	)
	@JoinColumn([{ name: 'frequency_id', referencedColumnName: 'id' }])
	frequency: Frequency;

	@Column({ name: 'room_type_id', nullable: true })
	roomTypeId?: number;

	@OneToMany(() => Task, ({ template }) => template, { onDelete: 'CASCADE' })
	tasks: Task[];

	@OneToMany(
		() => TaskTemplateTranslation,
		({ taskTemplate }) => taskTemplate,
	)
	translations!: TaskTemplateTranslation[];
}
