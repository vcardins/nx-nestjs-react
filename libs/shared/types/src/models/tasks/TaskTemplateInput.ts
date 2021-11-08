import { IBaseTask } from '../../interfaces';
import { Frequencies } from '../../enums';

export class TaskTemplateInput implements IBaseTask {
	id?: number;
	name: string;
	description?: string | null;
	isActive: boolean | null;
	estimatedCompletionTime: number | null;
	daysOfWeek: number | null;
	rewardPoints: number | null;
	frequencyId: Frequencies;
	roomTypeId?: number;
}
