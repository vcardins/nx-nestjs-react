import { DataContext } from '@xapp/react/core';
import { ILookup } from '@xapp/shared/interfaces';

export class LookupStore extends DataContext<ILookup> {
	constructor(authHeader?: string) {
		super({
			basePath: 'lookup',
			authHeader,
		});
	}
}
