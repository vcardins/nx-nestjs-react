import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';

import { Frequency } from './frequency.entity';
import { RoomType } from './room_type.entity';
import { TaskTemplate } from '../../tasks/entities/task_template.entity';

@Entity('room_task')
export class RoomTask extends BaseEntity {
	@Column('int', { primary: true, name: 'room_type_id' })
	roomTypeId: number;

	@Column('int', { primary: true, name: 'task_id' })
	taskId: number;

	@Column('int', { name: 'relevance', nullable: true })
	relevance: number | null;

	@ManyToOne(() => Frequency, (frequency) => frequency.roomTasks)
	@JoinColumn([{ name: 'frequency_id', referencedColumnName: 'id' }])
	frequency: Frequency;

	@ManyToOne(() => TaskTemplate, ({ roomTasks }) => roomTasks)
	@JoinColumn([{ name: 'task_template_id', referencedColumnName: 'id' }])
	taskTemplate: TaskTemplate;

	@ManyToOne(() => RoomType, (roomType) => roomType.tasks)
	@JoinColumn([{ name: 'room_type_id', referencedColumnName: 'id' }])
	roomType: RoomType;
}
