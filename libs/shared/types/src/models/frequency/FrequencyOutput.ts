import { WithId } from '..';
import { FrequencyInput } from './FrequencyInput';

export class FrequencyOutput extends FrequencyInput implements WithId {
	id: number;
}
