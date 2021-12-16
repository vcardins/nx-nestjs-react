import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';

import { RoomType } from './../../shared/entities/room_type.entity';
import { Household } from './household.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('household_room')
export class HouseholdRoom extends BaseEntity {
	@Column('int', { name: 'household_id' })
	householdId: number;

	@Column('int', { name: 'room_type_id' })
	roomTypeId: number;

	@Column('varchar', { name: 'custom_name', length: 60, nullable: true })
	customName: string | null;

	@ManyToOne(
		() => RoomType,
		({ rooms }) => rooms,
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'room_type_id', referencedColumnName: 'id' }])
	roomType: RoomType;

	@ManyToOne(
		() => Household,
		({ rooms }) => rooms,
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@OneToMany(
		() => Task,
		({ householdRoom }) => householdRoom,
		{ eager: true, onDelete: 'CASCADE' },
	)
	@JoinColumn()
	tasks: Task[];
}
