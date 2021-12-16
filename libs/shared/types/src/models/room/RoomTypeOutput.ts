import { WithId } from '..';
import { RoomTypeInput } from './RoomTypeInput';

export class RoomTypeOutput extends RoomTypeInput implements WithId {
	id: number;
}
