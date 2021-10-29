import { KeyType, IColumnInfo } from '@xapp/shared/types';
import { IAuthState, IApiCallState } from './';

export interface IStoreState<TStore = any> extends IApiCallState {
	store: TStore | null;
	init: (authProps: IAuthState) => Promise<void>;
	reset?: () => void;
	clearError: () => void;
	checkedItems?: KeyType[];
	setCheckedItems?: (items: KeyType[]) => void;
	expandedItems?: KeyType[];
	setExpandedItems?: (items: KeyType | KeyType[]) => void;
	columns?: IColumnInfo[];
	visibleColumns?: IColumnInfo['key'][];
	toggleColumnVisibility?: (key: IColumnInfo['key'], visible: boolean) => void;
}
