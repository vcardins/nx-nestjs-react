import { UserGroup } from '../enums';

export interface ILookup {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authGroups: Record<string, UserGroup[]>;
	userGroups: Record<string, string>;
}
