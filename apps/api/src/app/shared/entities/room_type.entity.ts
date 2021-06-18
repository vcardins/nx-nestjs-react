import { Column, Entity, OneToMany, BaseEntity } from 'typeorm';

import { HouseholdRoom } from '../../household/entities/household_room.entity';
import { TaskTemplate } from '../../tasks/entities/task_template.entity';

@Entity('room_type')
export class RoomType extends BaseEntity {
	@Column('int', { primary: true, name: 'id', unique: true })
	id: number;

	@Column('varchar', { name: 'name', length: 40 })
	name: string;

	@Column('varchar', { name: 'description', nullable: true, length: 255 })
	description: string | null;

	@OneToMany(() => HouseholdRoom, ({ roomType }) => roomType)
	rooms: HouseholdRoom[];

	@OneToMany(() => TaskTemplate, ({ roomType }) => roomType)
	tasksTemplates: TaskTemplate[];
}
