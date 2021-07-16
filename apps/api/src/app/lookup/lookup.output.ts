import { FrequencyOutput, UserRoles, RoomTypes, TaskTemplateOutput, HouseholdRoomOutput } from '@xapp/shared/types';
export class LookupOutput {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authRoles: Record<string, UserRoles[]>;
	userRoles: Record<string, string>;
	frequencies: Record<number, FrequencyOutput>;
	roomTypes: Record<number, HouseholdRoomOutput>;
	tasksTemplates: Record<RoomTypes, TaskTemplateOutput[]>;
}
