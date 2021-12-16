import { CSSProperties, ReactNode, ChangeEvent, ReactElement, MutableRefObject } from 'react';

import { Positioning, PaginationMode, KeyType, IColumnInfo } from '@xapp/shared/types';

export interface IColumnKey {
	id: KeyType;
}

export interface ITableSettings {
	fontSize?: CSSProperties['fontSize'];
	textColor?: CSSProperties['color'];
	rowHeight?: number;
	rowsPerBody?: number;
	cellPadding?: CSSProperties['padding'];
	white?: CSSProperties['color'];
	evenRowColor?: CSSProperties['color'];
	oddRowColor?: CSSProperties['color'];
	messageRowColor?: CSSProperties['color'];
	minCellWidth?: CSSProperties['width'];
	borderColor?: CSSProperties['borderColor'];
	headerHeight?: CSSProperties['height'];
	footerHeight?: CSSProperties['height'];
	maxExpandedContentHeight?: CSSProperties['height'];
}

export interface IIconProps {
	color?: CSSProperties['color'];
	size?: CSSProperties['width'];
}

export interface IExpandedCellProps {
	id?: string;
	align?: Positioning;
	children: ReactNode;
	bg?: CSSProperties['color'];
	borderColor?: CSSProperties['borderColor'];
	maxHeight?: CSSProperties['height'];
}

export interface ITableCellProps {
	id?: string;
	role?: string;
	align?: Positioning;
	forwardRef?: MutableRefObject<HTMLDivElement>;
	fixed?: Positioning;
	children?: ReactNode;
}

type SharedTableProps =
	'idProp'
	| 'expandedItems'
	| 'checkedItems'
	| 'actions'
	| 'onBuildIds'
	| 'onGetExpandedContent'
	| 'onCheckItems'
	| 'columns'
	| 'customRenderers'
	| 'onExpandItems';

export interface ITableRowProps<T extends IColumnKey> extends Pick<ITableProps, SharedTableProps> {
	id?: string;
	index: number;
	columnsWidths?: string;
	bg?: CSSProperties['color'];
	item: T;
	children?: ReactNode;
}

export interface ICommonRenderer<T = any> {
	cellProps?: ITableCellProps;
	data?: T;
	showNAIfEmpty?: boolean;
	cellDataPlaceholder?: string;
}


export interface IColumnHeader extends IColumnInfo {
	id?: string;
	index: number;
	isLast: boolean;
	isResizing: boolean;
	children: ReactElement | string;
	onResize?: (headerIndex: number) => void;
	onSort?: () => void;
	tableHeight: number | 'auto';
}

export interface ITableRefsProps {
	wrapper: MutableRefObject<HTMLDivElement>;
	body: MutableRefObject<HTMLDivElement>;
	header: MutableRefObject<HTMLDivElement>;
	shadow: {
		top?: MutableRefObject<HTMLDivElement>,
		right?: MutableRefObject<HTMLDivElement>,
		bottom?: MutableRefObject<HTMLDivElement>,
		left?: MutableRefObject<HTMLDivElement>,
	};
}

export interface ICheckboxRenderer {
	id?: string;
	disabled: boolean;
	checked: boolean;
	onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export interface IExpanderRenderer {
	id?: string;
	icon?: string;
	disabled: boolean;
	isExpanded: boolean;
	onClick(): any;
}


export type CustomRenderer<TItem> = (props: RenderProps<TItem>) => ReactElement | string | undefined;
export type CustomRenderers<TItem> = Record<string, CustomRenderer<Partial<TItem>>>;

export interface IPaginationSettings {
	mode: PaginationMode;
	pageSize?: number;
	pageNumber?: number;
	totalItems?: number;
	onPageChange?: (page: number) => Promise<void> | void;
}

export interface ITableProps<T extends IColumnKey = any> {
	id?: string;
	idProp?: string;
	isLoading?: boolean;
	allowMultiRowExpansion?: boolean;
	// 	/** Allow check-all functionality */
	allowCheckAll?: boolean;
	// 	/** Collection name for which data is being displayed*/
	collectionName?: string;

	// 	/** Whether show table borders */
	showBorders?: boolean;
	columns: IColumnInfo[];
	data?: T[];
	settings?: ITableSettings;
	checkedItems?: KeyType[];
	expandedItems?: KeyType[];
	noRecordsMessage?: string;
	pagination?: IPaginationSettings;
	toolbar?: ReactNode;
	customRenderers?: CustomRenderers<T>;
	actions?: ((item: T) => ReactNode)[];
	onCheckItems?: (ids: KeyType | KeyType[]) => void;
	onExpandItems?: (ids: KeyType | KeyType[]) => void;
	onGetExpandedContent?: (item: T) => ReactNode;
	onBuildIds?: {
		header?: (key: string) => string;
		row?: (item: T) => string;
		cell?: (key: string, item: T) => string;
		checkbox?: (item: T) => string;
		checkboxAll?: () => string;
		expander?: (item: T) => string;
	}
}

export interface ITableState<T extends IColumnKey> {
	columns: IColumnInfo[];
	data?: T[];
	loading: boolean;
	total: number;
	rowHeight: number;
	rowsPerBody: number;
	visibleStart: number;
	visibleEnd: number;
	displayStart: number;
	displayEnd: number;
	verticalScroll: number;
	shouldUpdate: boolean;
}

export interface ICheckboxRenderer {
	id?: string;
	disabled: boolean;
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IExpanderRenderer {
	id?: string;
	icon?: string;
	isExpanded: boolean;
	onClick(): any;
}


export interface IPendingUpdates<T> extends Record<KeyType, T> {}

export type RenderProps<Item> = {
	// -- Table Data
	// tableProps: { itemsLength: number; };
	column: IColumnInfo;
	item: Item;
	cellData?: ReactNode;
	cellDataPlaceholder?: ReactNode;
	pendingUpdates?: IPendingUpdates<Item>;
}

// export interface IDataTableProps<Item, TFilter = any> {
// 	/** Domain key prop */
// 	idProp?: keyof Item;
// 	/** Table element id */
// 	id: string;
// 	/** Enums and Facets */
// 	/** Items to be rendered in the table */
// 	items: ModelKey<Item>[];
// 	/** Items header config */
// 	headers: IColumnInfo[] | (IColumnInfo[] | undefined)[];
// 	/** Id of items which should be fixed to the top */
// 	fixedRowIds?: number[];
// 	/** Optional background-color to be applied to fixed rows */
// 	fixedRowColor?: string;
// 	/** Filters which items should be filtered against */
// 	filters?: TFilter;
// 	/** Render expanded rows */
// 	onRenderExpandedRow?: (item: ModelKey<Item>) => ReactElement | null;
// 	/** Height of the expansion row content */
// 	onGetExpandedRowHeight?: (item: ModelKey<Item>) => number;
// 	/** Items ids which were checked */
// 	checkedItems?: (number | string)[];
// 	/** Custom highlighted rows ids */
// 	highlightedRowIds?: number[] | number;
// 	onHighlightItem?(id: number): void;
// 	/** Items ids which are expanded */
// 	expandedItems?: number[];
// 	/** Whether show table borders */
// 	showBorders?: boolean;
// 	/** Allow multi row expansion */
// 	legend?: ReactNode;
// 	/** Pagination object */
// 	pagination?: Required<IPaginationSettings>;
// 	/** Allow multi row expansion */
// 	allowMultiRowExpansion?: boolean;
// 	/** Allow check-all functionality */
// 	allowCheckAll?: boolean;
// 	/** Collection name for which data is being displayed*/
// 	collectionName?: string;
// 	/** Message to be displayed when records have been loaded yet*/
// 	initialMessage?: string;
// 	/** Message (replaces the by default one) to be displayed when there are no rows to show*/
// 	noRowsMessage?: string;
// 	/** */
// 	customRenderers?: CustomRenderers<Item>;
// 	/** */
// 	pendingUpdates?: IPendingUpdates<Item>;
// 	/** Table class name */
// 	tableClassName?: string;
// 	/** Info row class name */
// 	infoRowId?: string;
// 	/** Placeholder value to be displayed if there is no cell data */
// 	cellDataPlaceholder?: ReactNode;
// 	/** Ids of items which should receive `row-new` class */
// 	newIds?: number[];
// 	/** Function to be triggered when component is loaded */
// 	onLoad?: (filters?: TFilter) => Promise<any>;
// 	/** Function to be triggered when item is checked */
// 	onToggleCheck?: (id: number) => void;
// 	onToggleExpand?: (id: number) => Promise<any>;
// 	/** Method to be called when a column is sorted */
// 	onSortItems?(orderByKey: string, sortDir: SortDirections): void;
// 	onBuildIds?: {
// 		row?: (item: ModelKey<Item>) => string;
// 		expander?: (item: ModelKey<Item>) => string;
// 		checkbox?: (item: ModelKey<Item>) => string;
// 		checkAll?: () => string;
// 		cell?: (item: ModelKey<Item>, columnKey: string) => string;
// 		header?(key: IColumnInfo['key']): string;
// 	};
// 	/** Method to be called when the table is scrolled along the x-axis */
// 	onHorizontalScroll?: () => boolean;
// 	/** Method to be called to determine weather the cells of a given row show have a darker bottom-border (divider) */
// 	onGetIsBorderedRow?: (rowIndex: number) => boolean;
// 	/** Method to be called to store updated values for editable cells */
// 	onSave?(...args: any[]): any;
// }
