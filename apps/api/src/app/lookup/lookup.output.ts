import {
	FrequencyOutput,
	UserRoles,
	RoomTypes,
	TaskTemplateOutput,
	HouseholdOutput,
	ILookup,
	RoomTypeOutput,
} from '@xapp/shared/types';

export class LookupOutput implements ILookup {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authRoles: Record<string, UserRoles[]>;
	userRoles: Record<string, string>;
	frequencies: Record<number, FrequencyOutput>;
	roomTypes: Record<number, RoomTypeOutput>;
	tasksTemplates: Record<RoomTypes, TaskTemplateOutput[]>;
	households: HouseholdOutput[];
}
