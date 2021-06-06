import { ILookup } from '@xapp/shared/types';

export class LookupOutput implements ILookup {
	dateFormats: Record<string, string>;
	oAuthProviders: Record<string, string>;
	authGroups: ILookup['authGroups'];
	userGroups: Record<string, string>;

	constructor(props: Partial<LookupOutput>) {
		Object.assign(this, props);
	}
}
