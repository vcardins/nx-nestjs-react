import { Injectable } from '@nestjs/common';

import { OAuthProvider, UserRoles, AuthRoles } from '@xapp/shared/types';
import { DateFormat, FrequencyOutput, RoomTypeOutput } from '@xapp/shared/types';

import { FrequencyService } from '../shared/frequency.service';
import { RoomTypeService } from '../shared/room_type.service';
import { LookupOutput } from './lookup.output';

@Injectable()
export class LookupService {
	constructor(
		protected readonly frequencyService: FrequencyService,
		protected readonly roomTypeService: RoomTypeService,
	) {}

	async getAll(): Promise<LookupOutput> {
		const dateFormats = this.convertEnum(DateFormat);
		const oAuthProviders = this.convertEnum(OAuthProvider);
		const authRoles = this.convertEnum(AuthRoles);
		const userRoles = this.convertEnum(UserRoles);
		const frequencies = await this.frequencyService.find() as FrequencyOutput[];
		const roomTypes = await this.roomTypeService.find() as RoomTypeOutput[];

		return {
			dateFormats,
			oAuthProviders,
			authRoles,
			userRoles,
			frequencies,
			roomTypes,
		};
	}

	convertEnum<T>(enumObject: T): Record<string, any> {
		return Object.keys(enumObject).reduce((result, key) => {
			result[key] = enumObject[key];
			return result;
		}, {} as Record<string, any>);
	}
}
