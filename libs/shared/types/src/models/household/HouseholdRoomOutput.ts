import { RoomTypeInput } from '../room';
import { HouseholdRoomInput } from './HouseholdRoomInput';

export class HouseholdRoomOutput extends HouseholdRoomInput {
	id: number;
	roomType: RoomTypeInput;
}
