import { ILookup } from '@xapp/shared';
import { DataContext } from '@xapp/state/shared';

export class LookupStore extends DataContext<ILookup> {
	constructor(authHeader?: string) {
		super({
			basePath: 'lookup',
			authHeader,
		});
	}
}
