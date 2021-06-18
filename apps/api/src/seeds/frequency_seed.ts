import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { Frequency } from '../app/shared/entities/frequency.entity';
import { Frequencies } from '@xapp/shared/types';

export class SeedFrequency implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const data = [
			{ id: Frequencies.SingleTime, name: 'SingleTime', daysApart: 0 },
			{ id: Frequencies.Daily, name: 'Daily', daysApart: 1 },
			{ id: Frequencies.EveryOtherDay, name: 'Every other day', daysApart: 2 },
			{ id: Frequencies.Weekly, name: 'Weekly', daysApart: 7 },
			{ id: Frequencies.Biweekly, name: 'Biweekly', daysApart: 14 },
			{ id: Frequencies.Monthly, name: 'Monthly', daysApart: 30 },
			{ id: Frequencies.Bimonthly, name: 'Bimonthly', daysApart: 60 },
			{ id: Frequencies.Quarterly, name: 'Quarterly', daysApart: 90 },
			{ id: Frequencies.EverySixMonths, name: 'Every six months', daysApart: 180 },
			{ id: Frequencies.Annually, name: 'Annually', daysApart: 360 },
		];
		await execSave(Frequency, data);
	}
}
