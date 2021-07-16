import { HouseholdInput } from './HouseholdInput';
import { HouseholdRoomOutput } from './HouseholdRoomOutput';
import { HouseholdMemberOutput } from './HouseholdMemberOutput';

export class HouseholdOutput extends HouseholdInput {
	id: number;
	rooms: HouseholdRoomOutput[];
	members: HouseholdMemberOutput[];
}
