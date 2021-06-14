import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { Frequencies, RoomTypes } from '@xapp/shared/types';
import { RoomTask } from '../app/shared/entities/room_task.entity';

export default class SeedRoomTask implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const data = {
			kitchen: [
				{ roomTypeId: RoomTypes.Kitchen, frequency: Frequencies.Daily, relevance: 1 },
			],
		};
		await execSave(RoomTask, data);
	}
}

// { room_type_id: RoomTypes.LivingRoom, name: 'Living Room', description: 'Living Room' },
// { room_type_id: RoomTypes.Bedroom, name: 'Bedroom', description: 'Bedroom' },
// { room_type_id: RoomTypes.DiningRoom, name: 'Dining Room', description: 'Dining Room' },
// { room_type_id: RoomTypes.FamilyRoom, name: 'Family Room', description: 'Family Room' },
// { room_type_id: RoomTypes.GuestRoom, name: 'Guest Room', description: 'Guest Room' },
// { room_type_id: RoomTypes.Bathroom, name: 'Bathroom', description: 'Bathroom' },
// { room_type_id: RoomTypes.GameRoom, name: 'Game Room', description: 'Game Room' },
// { room_type_id: RoomTypes.Basement, name: 'Basement', description: 'Basement' },
// { room_type_id: RoomTypes.HomeOffice, name: 'Home Office', description: 'Home Office' },
// { room_type_id: RoomTypes.Nursery, name: 'Nursery', description: 'Nursery' },
// { room_type_id: RoomTypes.Playroom, name: 'Playroom', description: 'Playroom' },
// { room_type_id: RoomTypes.StorageRoom, name: 'Storage Room', description: 'Storage Room' },
// { room_type_id: RoomTypes.Garage, name: 'Garage', description: 'Garage' },
// { room_type_id: RoomTypes.LaundryRoom, name: 'Laundry Room', description: 'Laundry Room' },
