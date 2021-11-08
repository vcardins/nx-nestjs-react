import { KeyType, IColumnInfo, Operations } from '@xapp/shared/types';
import { IAuthState, IApiCallState, StoreEventHandlers } from './';

export interface IStoreState<TStore = any> extends IApiCallState {
	store: TStore | null;
	init: (authProps: IAuthState, eventsHandlers?: StoreEventHandlers) => Promise<void>;
	reset?: () => void;
	clearError: () => void;
	getEventsListeners?:() => Record<string, (args: any) => void>;
	checkedItems?: KeyType[];
	setCheckedItems?: (items: KeyType[]) => void;
	expandedItems?: KeyType[];
	setExpandedItems?: (items: KeyType | KeyType[]) => void;
	columns?: IColumnInfo[];
	visibleColumns?: IColumnInfo['key'][];
	toggleColumnVisibility?: (key: IColumnInfo['key'], visible: boolean) => void;
}
