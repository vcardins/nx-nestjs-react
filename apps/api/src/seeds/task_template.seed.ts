import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { TaskTemplate } from '../app/tasks/entities/task_template.entity';

export default class SeedTaskTemplate implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const data = [
			{ name: '', description: '', isActive: true, estimatedTime: 15, rewardPoints: 5 },
		] as TaskTemplate[];
		await execSave(TaskTemplate, data);
	}
}

// Put away any items on table or counters.
// Empty the dishwasher.
// Wash dishes.
// Sweep floors.
// Wipe counter tops.
// Wipe up spills.
// Wipe/sanitize the refrigerator handle.
// Empty the trash.
// Change towels and washcloths.
// Clean and sanitize sponges.
// Wipe out the sink.
// Sanitize cutting boards.

