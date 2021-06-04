import { UserGroup } from '@xapp/shared/enums';

export class LookupOutput {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authGroups: Record<string, UserGroup[]>;

	userGroups: Record<string, string>;

	constructor(props: Partial<LookupOutput>) {
		Object.assign(this, props);
	}
}
