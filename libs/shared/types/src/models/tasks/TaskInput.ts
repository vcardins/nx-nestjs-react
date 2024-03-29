import { HouseholdRoomOutput } from './../household/HouseholdRoomOutput';
import { Frequencies } from '../../enums/Frequencies';
import { TaskTemplateOutput } from './TaskTemplateOutput';
import { IBaseTask } from '../../interfaces';

export class TaskInput implements IBaseTask {
	name: string;
	description?: string | null;
	isActive: boolean | null;
	householdId: number;
	estimatedCompletionTime: number | null;
	daysOfWeek: number | null;
	rewardPoints: number | null;
	assignedUserId?: number | null;
	frequencyId: Frequencies;
	templateId?: TaskTemplateOutput['id'] | null;
	householdRoomId: HouseholdRoomOutput['id'];
}
