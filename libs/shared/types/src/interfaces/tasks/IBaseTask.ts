import { Frequencies } from '../../enums/Frequencies';

export interface IBaseTask {
	name: string;
	description?: string | null;
	isActive: boolean | null;
	estimatedCompletionTime: number | null;
	daysOfWeek: number | null;
	rewardPoints: number | null;
	frequencyId: Frequencies;
}
