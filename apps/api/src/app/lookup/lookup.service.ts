import { Injectable } from '@nestjs/common';
import { DateFormat } from '@xapp/shared/types';
import { OAuthProvider, UserGroup, AuthGroups } from '@xapp/shared/auth';

import { LookupOutput } from './lookup.output';

@Injectable()
export class LookupService {
	async getAll(): Promise<LookupOutput> {
		const dateFormats = this.convertEnum(DateFormat);
		const oAuthProviders = this.convertEnum(OAuthProvider);
		const authGroups = this.convertEnum(AuthGroups);
		const userGroups = this.convertEnum(UserGroup);

		return Promise.resolve({
			dateFormats,
			oAuthProviders,
			authGroups,
			userGroups,
		});
	}

	convertEnum<T>(enumObject: T): Record<string, any> {
		return Object.keys(enumObject).reduce((result, key) => {
			result[key] = enumObject[key];
			return result;
		}, {} as Record<string, any>);
	}
}
