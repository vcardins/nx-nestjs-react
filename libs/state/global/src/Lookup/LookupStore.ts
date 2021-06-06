import { ILookup } from '@xapp/shared/types';
import { DataContext } from '@xapp/state/shared';

export class LookupStore extends DataContext<ILookup> {
	constructor(authHeader?: string) {
		super({
			basePath: 'lookup',
			authHeader,
		});
	}
}
