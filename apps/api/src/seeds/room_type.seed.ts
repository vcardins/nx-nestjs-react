import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { RoomType } from '../app/shared/entities/room_type.entity';
import { RoomTypes } from '@xapp/shared/types';

export default class SeedRoomType implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const data = [
			{ id: RoomTypes.LivingRoom, name: 'Living Room', description: 'Living Room' },
			{ id: RoomTypes.Bedroom, name: 'Bedroom', description: 'Bedroom' },
			{ id: RoomTypes.Kitchen, name: 'Kitchen', description: 'Kitchen' },
			{ id: RoomTypes.DiningRoom, name: 'Dining Room', description: 'Dining Room' },
			{ id: RoomTypes.FamilyRoom, name: 'Family Room', description: 'Family Room' },
			{ id: RoomTypes.GuestRoom, name: 'Guest Room', description: 'Guest Room' },
			{ id: RoomTypes.Bathroom, name: 'Bathroom', description: 'Bathroom' },
			{ id: RoomTypes.GameRoom, name: 'Game Room', description: 'Game Room' },
			{ id: RoomTypes.Basement, name: 'Basement', description: 'Basement' },
			{ id: RoomTypes.HomeOffice, name: 'Home Office', description: 'Home Office' },
			{ id: RoomTypes.Nursery, name: 'Nursery', description: 'Nursery' },
			{ id: RoomTypes.Playroom, name: 'Playroom', description: 'Playroom' },
			{ id: RoomTypes.StorageRoom, name: 'Storage Room', description: 'Storage Room' },
			{ id: RoomTypes.Garage, name: 'Garage', description: 'Garage' },
			{ id: RoomTypes.LaundryRoom, name: 'Laundry Room', description: 'Laundry Room' },
		];
		await execSave(RoomType, data);
	}
}
