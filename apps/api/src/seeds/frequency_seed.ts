import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { Frequency } from '../app/shared/entities/frequency.entity';
import { Frequencies } from '@xapp/shared/types';

export class SeedFrequency implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const data = [
			{ id: Frequencies.SingleTime, name: 'One time only', daysInterval: 0 },
			{ id: Frequencies.Daily, name: 'Daily', daysInterval: 1 },
			{ id: Frequencies.EveryOtherDay, name: 'Every other day', daysInterval: 2 },
			{ id: Frequencies.Weekly, name: 'Weekly', daysInterval: 7 },
			{ id: Frequencies.Biweekly, name: 'Biweekly', daysInterval: 14 },
			{ id: Frequencies.Monthly, name: 'Monthly', daysInterval: 30 },
			{ id: Frequencies.Bimonthly, name: 'Bimonthly', daysInterval: 60 },
			{ id: Frequencies.Quarterly, name: 'Quarterly', daysInterval: 90 },
			{ id: Frequencies.EverySixMonths, name: 'Every six months', daysInterval: 180 },
			{ id: Frequencies.Annually, name: 'Annually', daysInterval: 360 },
		];
		await execSave(Frequency, data);
	}
}
