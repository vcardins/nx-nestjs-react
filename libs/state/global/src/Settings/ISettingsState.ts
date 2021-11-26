import { ISettings } from '@xapp/shared/types';
import { IStoreState, StoreEventHandlers } from '@xapp/state/shared';

export interface ISettingsState extends Omit<IStoreState<ISettings>, 'store' | 'init'> {
	activeHousehold: number;
	setActiveHousehold(activeHousehold: number): void;
	init(eventsHandlers?: StoreEventHandlers): Promise<void>;
}
