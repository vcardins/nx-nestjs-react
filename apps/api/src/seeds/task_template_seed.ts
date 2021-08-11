import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { TaskTemplate } from '../app/tasks/entities/task_template.entity';
import { Frequencies, RoomTypes, TaskTemplateInput } from '@xapp/shared/types';

const tasksTemplate: Record<number, Record<number, TaskTemplateInput[]>> = {
	[RoomTypes.Kitchen]: {
		[Frequencies.Daily]: [
			{ name: 'Put away any items on table or counters', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Empty the dishwasher', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wash dishes', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Sweep floors', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wipe counter tops', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wipe up spills', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wipe/sanitize the refrigerator handle', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Empty the trash', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Change towels and washcloths', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean and sanitize sponges', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wipe out the sink', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Sanitize cutting boards', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
		[Frequencies.Weekly]: [
			{ name: 'Empty the refrigerator', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Throw away old food items from refrigerator and freezer', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wipe down refrigerator shelves, interior, and door gasket with sanitizing cleanser and a damp cloth before returning food', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Empty larger trashcans', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Take out the recycling', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wash and sanitize trash cans and trash cupboards with a sanitizing cleanser', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Dust your light fixtures', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wipe\/dust the top of the refrigerator with a damp cloth', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wipe\/dust tops of cupboards or other high areas with a damp cloth', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wipe cupboard doors and drawer fronts with a damp cloth and cleanser, if needed', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Sanitize drawer and cupboard pulls', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean the fronts of appliances with cleanser and a damp cloth', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean out the microwave with cleanser and a damp cloth', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean the sink with an abrasive cleanser and sanitize it', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean your sink drain using vinegar and boiling water', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Freshen your garbage disposal by running it with citrus rinds or a disposal deodorizer', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean faucet and sanitize handles with cleanser and a damp cloth', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean and sanitize controls and handles for appliances', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean and sanitize counter-tops', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Sweep and mop floors', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
		[Frequencies.Monthly]: [
			{ name: 'Straighten and organize cupboards and drawers, throwing away items you don\’t need', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Empty your silverware drawer and wipe the inside with a damp cloth', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Run your oven on a cleaning cycle, or clean it using an oven cleaner', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean coffeemaker and dishwasher by running them with vinegar', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Degrease stovetop and grates', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wash kitchen windows', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Use a degreasing cleanser for stove and grates, or use a cleanser designed for your stove type', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
		[Frequencies.EverySixMonths]: [
			{ name: 'Vacuum your refrigerator coils', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Empty cupboards and drawers and vacuum them out. Follow up by wiping the drawers and shelves with a disinfecting cleanser and organize them', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean your pantry, wash the shelves, and organize', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wash kitchen walls', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean behind the refrigerator and other appliances', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
	},
	[RoomTypes.DiningRoom]: {
		[Frequencies.Weekly]: [
			{ name: 'Clean windows/window treatments', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean/polish table and chairs', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Sweep/mop hard floors', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Vacuum carpets/area rugs', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
	},
	[RoomTypes.Bathroom]: {
		[Frequencies.Weekly]: [
			{ name: 'Clean/sanitize sinks', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean/sanitize tubs, shower, toilet', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean mirrors and glass', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean and polish fixtures', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Dust light fixtures and bulbs', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wash floor', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
	},
	[RoomTypes.Bedroom]: {
		[Frequencies.Weekly]: [
			{ name: 'Change sheets', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Dust furniture/shelves', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Vacuum floor', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Wash windows', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Empty wastebaskets', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Dust light fixtures', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Put away clean laundry', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Dust/mop baseboards', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
	},
	[RoomTypes.LivingRoom]: {
		[Frequencies.Weekly]: [
			{ name: 'Dust all hard surfaces/shelves/blinds', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Vacuum carpets/area rugs', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Sweep/mop hard floors', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Vacuum upholstered furniture', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Polish wood', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean windows/window treatments', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
	},
	[RoomTypes.HomeOffice]: {
		[Frequencies.Weekly]: [
			{ name: 'Dust office surfaces/equipment', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'File or toss loose mail/paperwork', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean windows/window treatments', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Vacuum carpets/area rugs', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
	},
	[RoomTypes.LaundryRoom]: {
		[Frequencies.Weekly]: [
			{ name: 'Clean washer and dryer exteriors', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean inside rim of washer', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Change/clean lint traps', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Dust light fixtures and bulbs', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Empty wastebasket', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Sweep and mop floor', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean laundry sink and fixtures', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean laundry counter/hamper', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
	},
	[RoomTypes.Hallway]: {
		[Frequencies.Weekly]: [
			{ name: 'Vacuum carpets/area rugs', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Sweep/mop hard floors', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Dust cobwebs; ceiling/baseboard', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
			{ name: 'Clean windows/window treatments', isActive: true, estimatedCompletionTime: 30, daysOfWeek: 2, rewardPoints: 1, frequencyId: Frequencies.Weekly },
		],
	},
	[RoomTypes.Patio]: {
		[Frequencies.Weekly]: [

		],
	},
};

export class SeedTaskTemplate implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		let tasks = [];
		Object.keys(tasksTemplate).forEach((key) => {
			const roomType = Number(key) as RoomTypes;
			Object.keys(tasksTemplate[key]).forEach((key2) => {
				const frequency = Number(key2) as Frequencies;
				tasks = tasks.concat(
					tasksTemplate[roomType][frequency].map((item) => ({
						...item,
						roomType,
						frequencyId: frequency,
						frequency,
						translations: [

						],
					})),
				);
			});
		});

		await execSave(TaskTemplate, tasks);
	}
}
