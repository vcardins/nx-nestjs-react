import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';
import { Frequency } from '../app/shared/entities/frequency.entity';

export default class SeedFrequency implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const data = [
			{ name: 'Daily', daysApart: 1 },
			{ name: 'Every other dat', daysApart: 2 },
			{ name: 'Weekly', daysApart: 7 },
			{ name: 'Biweekly', daysApart: 14 },
			{ name: 'Monthly', daysApart: 30 },
			{ name: 'Biweekly', daysApart: 60 },
			{ name: 'Quarterly', daysApart: 90 },
			{ name: 'Every six months', daysApart: 180 },
			{ name: 'Annually', daysApart: 360 },
		];
		await execSave(Frequency, data);
	}
}
