import { ISettings } from '@xapp/shared/types';
import { IStoreState, StoreEventHandlers } from '@xapp/state/shared';

export interface ISettingsState extends Omit<IStoreState, 'store' | 'init'>, ISettings {
	setActiveHousehold(activeHousehold: number): void;
	init(eventsHandlers?: StoreEventHandlers): Promise<void>;
}
