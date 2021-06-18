import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';

import { TaskTemplate } from '../app/tasks/entities/task_template.entity';
import { Frequencies, RoomTypes, TaskTemplateInput } from '@xapp/shared/types';

const tasksTemplate: Record<number, Record<number, TaskTemplateInput[]>> = {
	[RoomTypes.Kitchen]: {
		[Frequencies.Daily]: [
			{ name: 'Put away any items on table or counters', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Empty the dishwasher', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wash dishes', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Sweep floors', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wipe counter tops', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wipe up spills', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wipe/sanitize the refrigerator handle', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Empty the trash', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Change towels and washcloths', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean and sanitize sponges', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wipe out the sink', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Sanitize cutting boards', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
		[Frequencies.Weekly]: [
			{ name: 'Empty the refrigerator', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Throw away old food items from refrigerator and freezer', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wipe down refrigerator shelves, interior, and door gasket with sanitizing cleanser and a damp cloth before returning food', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Empty larger trashcans', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Take out the recycling', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wash and sanitize trash cans and trash cupboards with a sanitizing cleanser', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Dust your light fixtures', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wipe\/dust the top of the refrigerator with a damp cloth', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wipe\/dust tops of cupboards or other high areas with a damp cloth', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wipe cupboard doors and drawer fronts with a damp cloth and cleanser, if needed', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Sanitize drawer and cupboard pulls', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean the fronts of appliances with cleanser and a damp cloth', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean out the microwave with cleanser and a damp cloth', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean the sink with an abrasive cleanser and sanitize it', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean your sink drain using vinegar and boiling water', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Freshen your garbage disposal by running it with citrus rinds or a disposal deodorizer', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean faucet and sanitize handles with cleanser and a damp cloth', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean and sanitize controls and handles for appliances', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean and sanitize counter-tops', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Sweep and mop floors', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
		[Frequencies.Monthly]: [
			{ name: 'Straighten and organize cupboards and drawers, throwing away items you don\’t need', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Empty your silverware drawer and wipe the inside with a damp cloth', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Run your oven on a cleaning cycle, or clean it using an oven cleaner', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean coffeemaker and dishwasher by running them with vinegar', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Degrease stovetop and grates', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wash kitchen windows', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Use a degreasing cleanser for stove and grates, or use a cleanser designed for your stove type', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
		[Frequencies.EverySixMonths]: [
			{ name: 'Vacuum your refrigerator coils', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Empty cupboards and drawers and vacuum them out. Follow up by wiping the drawers and shelves with a disinfecting cleanser and organize them', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean your pantry, wash the shelves, and organize', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wash kitchen walls', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean behind the refrigerator and other appliances', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
	},
	[RoomTypes.DiningRoom]: {
		[Frequencies.Weekly]: [
			{ name: 'Clean windows/window treatments', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean/polish table and chairs', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Sweep/mop hard floors', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Vacuum carpets/area rugs', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
	},
	[RoomTypes.Bathroom]: {
		[Frequencies.Weekly]: [
			{ name: 'Clean/sanitize sinks', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean/sanitize tubs, shower, toilet', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean mirrors and glass', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean and polish fixtures', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Dust light fixtures and bulbs', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wash floor', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
	},
	[RoomTypes.Bedroom]: {
		[Frequencies.Weekly]: [
			{ name: 'Change sheets', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Dust furniture/shelves', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Vacuum floor', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Wash windows', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Empty wastebaskets', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Dust light fixtures', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Put away clean laundry', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Dust/mop baseboards', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
	},
	[RoomTypes.LivingRoom]: {
		[Frequencies.Weekly]: [
			{ name: 'Dust all hard surfaces/shelves/blinds', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Vacuum carpets/area rugs', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Sweep/mop hard floors', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Vacuum upholstered furniture', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Polish wood', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean windows/window treatments', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
	},
	[RoomTypes.HomeOffice]: {
		[Frequencies.Weekly]: [
			{ name: 'Dust office surfaces/equipment', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'File or toss loose mail/paperwork', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean windows/window treatments', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Vacuum carpets/area rugs', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
	},
	[RoomTypes.LaundryRoom]: {
		[Frequencies.Weekly]: [
			{ name: 'Clean washer and dryer exteriors', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean inside rim of washer', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Change/clean lint traps', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Dust light fixtures and bulbs', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Empty wastebasket', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Sweep and mop floor', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean laundry sink and fixtures', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean laundry counter/hamper', isActive: true, estimatedTime: 30, rewardPoints: 1 },
		],
	},
	[RoomTypes.Hallway]: {
		[Frequencies.Weekly]: [
			{ name: 'Vacuum carpets/area rugs', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Sweep/mop hard floors', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Dust cobwebs; ceiling/baseboard', isActive: true, estimatedTime: 30, rewardPoints: 1 },
			{ name: 'Clean windows/window treatments', isActive: true, estimatedTime: 30, rewardPoints: 1 },
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
					tasksTemplate[roomType][frequency].map((item) => ({ ...item, roomType, frequency })),
				);
			});
		});

		await execSave(TaskTemplate, tasks);
	}
}
