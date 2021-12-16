import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { SeedUsersAndAcl } from './users_seed';
import { SeedFrequency } from './frequency_seed';
import { SeedLanguage } from './language_seed';
import { SeedRoomType } from './room_type_seed';
import { SeedTaskTemplate } from './task_template_seed';

export default class Seed implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await new SeedUsersAndAcl().run(factory, connection);
		await new SeedFrequency().run(factory, connection);
		await new SeedLanguage().run(factory, connection);
		await new SeedRoomType().run(factory, connection);
		await new SeedTaskTemplate().run(factory, connection);
	}
}
