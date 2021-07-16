import { HouseholdMemberOutput } from './HouseholdMemberOutput';
import { HouseholdRoomOutput } from './HouseholdRoomOutput';

export class HouseholdInput {
	name: string;
	description?: string;
	ownerUser?: any;
	members?: HouseholdMemberOutput[];
	rooms?: HouseholdRoomOutput[];
}
