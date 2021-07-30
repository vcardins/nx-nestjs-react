import { ILookup } from '@xapp/shared/types';
import { ICrudState } from '@xapp/state/shared';
import { LookupStore } from '.';

export interface ILookupState extends
	Omit<ICrudState<LookupStore>, 'save' | 'remove' | 'reset' | 'items'>,
	ILookup {
	setActiveHousehold(activeHousehold: number): void;
}
