import { FrequencyOutput, RoomTypeOutput, TaskTemplateOutput } from '..';
import { RoomTypes, UserRoles } from '../enums';

export interface ILookup {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authRoles: Record<string, UserRoles[]>;
	userRoles: Record<string, string>;
	frequencies: FrequencyOutput[];
	roomTypes: RoomTypeOutput[];
	tasksTemplates: Record<RoomTypes, TaskTemplateOutput[]>;
}
