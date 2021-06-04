import { ILookup } from '@xapp/shared/interfaces';
import { ICrudState } from '@xapp/state/shared';
import { LookupStore } from '.';

export interface ILookupState extends
	Omit<ICrudState<LookupStore>, 'save' | 'remove' | 'reset' | 'items'>, ILookup {}
