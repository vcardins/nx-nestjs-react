import { Resources } from '../../enums/Resources';
import { Operations } from '../../enums/Operations';

export interface IPermissionOutput {
	id: number;
	name: string;
	title: string;
	resource: Resources;
	operations: Operations;
}
