import { Frequencies } from '../../enums/Frequencies';

export interface IBaseTask {
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
