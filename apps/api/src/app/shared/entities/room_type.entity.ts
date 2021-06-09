import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { RoomTask } from './room_task.entity';
import { HouseholdRoom } from '../../household/entities/household_room.entity';

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

	@OneToMany(() => RoomTask, ({ roomType }) => roomType)
	tasks: RoomTask[];
}