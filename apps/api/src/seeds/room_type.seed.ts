import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';
import { RoomType } from '../app/shared/entities/room_type.entity';

export default class SeedRoomType implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const data = [
			{ name: 'Living Room', description: 'Living Room' },
			{ name: 'Bedroom', description: 'Bedroom' },
			{ name: 'Kitchen', description: 'Kitchen' },
			{ name: 'Dining Room', description: 'Dining Room' },
			{ name: 'Family Room', description: 'Family Room' },
			{ name: 'Guest Room', description: 'Guest Room' },
			{ name: 'Bathroom', description: 'Bathroom' },
			{ name: 'Game Room', description: 'Game Room' },
			{ name: 'Basement', description: 'Basement' },
			{ name: 'Home Office', description: 'Home Office' },
			{ name: 'Nursery', description: 'Nursery' },
			{ name: 'Playroom', description: 'Playroom' },
			{ name: 'Storage Room', description: 'Storage Room' },
			{ name: 'Garage', description: 'Garage' },
			{ name: 'Laundry room', description: 'Laundry room' },
		];
		await execSave(RoomType, data);
	}
}
