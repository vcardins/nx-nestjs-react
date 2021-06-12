import { UserRole } from '../enums';

export interface ILookup {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authGroups: Record<string, UserRole[]>;
	userGroups: Record<string, string>;
}
