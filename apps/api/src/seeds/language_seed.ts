import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { Language } from '../app/shared/entities/language.entity';

export class SeedLanguage implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const data = [
			{ code: 'pt_br', name: 'Brazilian Portuguese', charset: 'utf-8' },
			{ code: 'en_us', name: 'American English', charset: 'utf-8' },
		];

		await execSave(Language, data);
	}
}
