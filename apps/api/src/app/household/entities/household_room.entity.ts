import { Column, Entity, BaseEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { RoomType } from './../../shared/entities/room_type.entity';

import { Household } from './household.entity';
import { Task } from '../../tasks/entities/task.entity';


@Entity('household_room')
export class HouseholdRoom extends BaseEntity {
	@Column('int', { primary: true, name: 'household_id' })
	householdId: number;

	@Column('int', { primary: true, name: 'room_type_id' })
	roomTypeId: number;

	@Column('varchar', { name: 'custom_name', nullable: true, length: 60 })
	customName: string | null;

	@ManyToOne(() => RoomType, (roomType) => roomType.rooms)
	@JoinColumn([{ name: 'room_type_id', referencedColumnName: 'id' }])
	roomType: RoomType;

	@ManyToOne(() => Household, (household) => household.rooms)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@OneToMany(() => Task, (task) => task.householdRoom)
	tasks: Task[];
}
