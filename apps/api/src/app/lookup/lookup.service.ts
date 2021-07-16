import { Injectable } from '@nestjs/common';

import { OAuthProvider, UserRoles, AuthRoles, DateFormat, FrequencyOutput, HouseholdRoomOutput } from '@xapp/shared/types';

import { FrequencyService } from '../shared/frequency.service';
import { RoomTypeService } from '../shared/room_type.service';
import { TaskTemplateService } from '../tasks/task_template.service';
import { LookupOutput } from './lookup.output';

@Injectable()
export class LookupService {
	constructor(
		protected readonly frequencyService: FrequencyService,
		protected readonly roomTypeService: RoomTypeService,
		protected readonly taskTemplateService: TaskTemplateService,
	) {}

	async getAll(): Promise<LookupOutput> {
		const dateFormats = this.convertEnum(DateFormat);
		const oAuthProviders = this.convertEnum(OAuthProvider);
		const authRoles = this.convertEnum(AuthRoles);
		const userRoles = this.convertEnum(UserRoles);
		const frequencies = await this.frequencyService.getAllMapped<FrequencyOutput>();
		const roomTypes = await this.roomTypeService.getAllMapped<HouseholdRoomOutput>();
		const tasksTemplates = await this.taskTemplateService.getMappedValues();

		return {
			dateFormats,
			oAuthProviders,
			authRoles,
			userRoles,
			frequencies,
			roomTypes,
			tasksTemplates,
		};
	}

	convertEnum<T>(enumObject: T): Record<string, any> {
		return Object.keys(enumObject).reduce((result, key) => {
			result[key] = enumObject[key];
			return result;
		}, {} as Record<string, any>);
	}
}
