import { HouseholdRoomOutput } from './../household/HouseholdRoomOutput';
import { Frequencies } from '../../enums/Frequencies';
import { IBaseTask } from '../../interfaces';
import { TaskTemplateOutput } from '.';

export class TaskInput implements IBaseTask {
	id?: number;
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
	roomTypeId?: number;
	householdRoomId: HouseholdRoomOutput['id'];
}
