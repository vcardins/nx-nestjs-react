import { HouseholdMemberOutput } from './HouseholdMemberOutput';
import { HouseholdRoomOutput } from './HouseholdRoomOutput';

export class HouseholdInput {
	name: string;
	description?: string;
	ownerUser?: unknown;
	members?: HouseholdMemberOutput[];
	rooms?: HouseholdRoomOutput[];
}
