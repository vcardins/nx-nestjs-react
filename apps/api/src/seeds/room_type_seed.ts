import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { RoomType } from '../app/shared/entities/room_type.entity';
import { RoomTypes } from '@xapp/shared/types';

export class SeedRoomType implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const keys = Object.keys(RoomTypes).filter((r) => isNaN(Number(r)));

		const data = keys.map((type) => {
			const id = RoomTypes[type];
			const name = type.split(/(?=[A-Z])/).join(' ');

			return { id, name, description: name };
		});

		await execSave(RoomType, data);
	}
}
