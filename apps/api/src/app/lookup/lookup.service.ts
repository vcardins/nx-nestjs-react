import { Injectable } from '@nestjs/common';

import {
	OAuthProvider,
	UserRoles,
	AuthGroups,
	DateFormat,
	FrequencyOutput,
	ILookup,
	RoomTypeOutput,
} from '@xapp/shared/types';

import { FrequencyService } from '../shared/frequency.service';
import { RoomTypeService } from '../shared/room_type.service';
import { TaskTemplateService } from '../tasks/task_template.service';
import { HouseholdService } from '../household/household.service';

@Injectable()
export class LookupService {
	constructor(
		protected readonly householdService: HouseholdService,
		protected readonly frequencyService: FrequencyService,
		protected readonly roomTypeService: RoomTypeService,
		protected readonly taskTemplateService: TaskTemplateService,
	) {}

	async getAll(userId: number): Promise<ILookup> {
		const dateFormats = this.convertEnum(DateFormat);
		const oAuthProviders = this.convertEnum(OAuthProvider);
		const authRoles = this.convertEnum(AuthGroups);
		const userRoles = this.convertEnum(UserRoles);
		const frequencies = await this.frequencyService.getAllMapped<FrequencyOutput>();
		const roomTypes = await this.roomTypeService.getAllMapped<RoomTypeOutput>();
		const tasksTemplates = await this.taskTemplateService.getMappedValues();
		const households = await this.householdService.getUserHouseholds(userId);

		return {
			dateFormats,
			oAuthProviders,
			authRoles,
			userRoles,
			frequencies,
			roomTypes,
			tasksTemplates,
			households,
		};
	}

	convertEnum<T>(enumObject: T): Record<string, any> {
		return Object.keys(enumObject).reduce((result, key) => {
			result[key] = enumObject[key];
			return result;
		}, {} as Record<string, any>);
	}
}
