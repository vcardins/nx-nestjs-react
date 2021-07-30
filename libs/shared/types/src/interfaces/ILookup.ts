import { FrequencyOutput, HouseholdOutput, HouseholdRoomOutput, TaskTemplateOutput } from '..';
import { RoomTypes, UserRoles } from '../enums';

export interface ILookup {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authRoles: Record<string, UserRoles[]>;
	userRoles: Record<string, string>;
	frequencies: Record<number, FrequencyOutput>;
	roomTypes: Record<number, HouseholdRoomOutput>;
	tasksTemplates: Record<RoomTypes, TaskTemplateOutput[]>;
	households: HouseholdOutput[];
	activeHousehold?: number;
}
