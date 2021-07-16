import { HouseholdRoomOutput } from './../household/HouseholdRoomOutput';
import { Frequencies } from '../../enums/Frequencies';
import { TaskTemplateOutput } from './TaskTemplateOutput';

export class TaskInput {
	name?: string;
	notes?: string;
	estimatedCompletionTime?: number | null;
	assignedUserId?: number | null;
	frequencyId: Frequencies;
	templateId?: TaskTemplateOutput['id'] | null;
	householdRoomId: HouseholdRoomOutput['id'];
}
