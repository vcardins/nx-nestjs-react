import { FrequencyOutput, UserRoles, RoomTypeOutput } from '@xapp/shared/types';
export class LookupOutput {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authRoles: Record<string, UserRoles[]>;
	userRoles: Record<string, string>;
	frequencies: FrequencyOutput[];
	roomTypes: RoomTypeOutput[];
}
