import { FrequencyOutput, UserRole, RoomTypeOutput } from '@xapp/shared/types';
export class LookupOutput {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authGroups: Record<string, UserRole[]>;
	userGroups: Record<string, string>;
	frequencies: FrequencyOutput[];
	roomTypes: RoomTypeOutput[];
}
