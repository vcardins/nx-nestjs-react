import { CSSProperties, ReactNode, ChangeEvent, ReactElement, MutableRefObject } from 'react';

import { SortDirections, TextAlignment, KeyType } from '@xapp/shared/types';
import { TableCellFormats } from './enums';

export interface IIconProps {
	color?: CSSProperties['color'];
	size?: CSSProperties['width'];
}


export interface ITableCellProps {
	id?: string;
	column: number;
	align?: TextAlignment;
	fixedLeft?: boolean;
	fixedRight?: boolean;
	children?: ReactNode;
}

export interface ICommonRenderer<T = any> {
	cellProps?: ITableCellProps;
	data?: T;
	showNAIfEmpty?: boolean;
	cellDataPlaceholder?: string;
}

export interface ICheckboxRenderer extends ICommonRenderer {
	checked?: boolean
	onCheck: (id: number) => void
}

export interface ITableConfig {
	rowHeight: number;
	rowsPerBody: number;
	minCellWidth: number;
}

export interface IColumnKey {
	id: KeyType;
}


export interface ITableColumn {
	align?: TextAlignment;
	editable?: boolean;
	fixedLeft?: boolean;
	fixedRight?: boolean;
	hidden?: boolean;
	label?: string;
	key: string;
	resizable?: boolean;
	searchable?: boolean;
	sortDirection?: SortDirections;
	forwardRef?: MutableRefObject<HTMLDivElement>;
	visible?: boolean;
	width?: number;
	format?: TableCellFormats;
}

export interface ICheckboxOptions {
	id?: string;
	disabled: boolean;
	checked: boolean;
	onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export interface IExpanderOptions {
	id?: string;
	icon?: string;
	disabled: boolean;
	isExpanded: boolean;
	onClick(): any;
}

export interface ITableHeader extends ITableColumn {
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
	topShadow: MutableRefObject<HTMLDivElement>;
	bottomShadow: MutableRefObject<HTMLDivElement>;
}

export type ModelKey<TItem> = TItem & ITableRowStatus & IWithId;
export type CustomRenderer<TItem> = (props: RenderProps<TItem>) => ReactElement | string | undefined;
export type CustomRenderers<TItem> = Record<string, CustomRenderer<Partial<TItem>>>;

type IdBuilder = (key: string, id: KeyType) => string;;

export interface ITableProps<T extends IColumnKey> {
	isDataReady?: boolean;
	columns: ITableColumn[];
	data?: T[];
	config?: ITableConfig;
	checkedItems?: KeyType[];
	expandedItems?: KeyType[];
	allowCheckAll?: boolean;
	customRenderers?: CustomRenderers<T>;
	onCheckItems?: (ids: KeyType | KeyType[]) => void;
	onExpandItems?: (ids: KeyType | KeyType[]) => void;
	onGetExpandedContent?: (item: T) => Promise<ReactNode>;

	onBuildIds?: {
		header?: (key: KeyType) => string;
		cell?: IdBuilder;
		checkbox?: IdBuilder;
		expander?: IdBuilder;
	}
}

export interface ITableState<T extends IColumnKey> {
	columns: ITableColumn[];
	data?: T[];
	loading: boolean;
	total: number;
	rowHeight: number;
	rowsPerBody: number;
	visibleStart: number;
	visibleEnd: number;
	displayStart: number;
	displayEnd: number;
	scroll: number;
	shouldUpdate: boolean;
}
export interface IColumnGrouping {
	[key: number]: ReactNode;
}

export interface IHeightSet {
	rowHeight: number;
	headerHeight: number;
	groupHeaderHeight: number;
}

export interface ITableColumnGroup {
	key: string;
	name?: string;
	label?: ReactNode;
	colSpan?: number;
}

export interface ITableSettings {
	columns: ITableColumn[];
	columnsGrouping?: IColumnGrouping;
	heights: IHeightSet;
}

export interface ICheckboxOptions {
	id?: string;
	disabled: boolean;
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IExpanderOptions {
	id?: string;
	icon?: string;
	isExpanded: boolean;
	onClick(): any;
}

export interface ICellProps {
	rowIndex: number;
	cellIndex: number;
	cellTextProp?: string;
	path?: string | number;
	'data-tooltip'?: string;
	'data-column-key'?: string;
	id?: string;
	key?: string;
	isBlocked?: boolean;
}

export interface IPendingUpdates<T> extends Record<IKey, T> {}

export type RenderProps<Item> = {
	// -- Table Data
	// tableProps: { itemsLength: number; };
	column: ITableColumn;
	item: Item;
	cellData?: ReactNode;
	cellDataPlaceholder?: ReactNode;
	pendingUpdates?: IPendingUpdates<Item>;
}

export type IKey = string | number | symbol;
export interface IWithId {
	id: IKey,
}


export interface ITableRowStatus {
	focused?: boolean;
	isDestroyed?: boolean;
	isNew?: boolean;
	isChanged?: boolean;
	isDisabled?: boolean;
	isFixed?: boolean;
}


export interface IPagingFilters {
	pageSize: number;
	pageNumber: number;
	totalItems?: number;
}

export interface IDataTableProps<Item, TFilter = any> {
	/** Domain key prop */
	idProp?: keyof Item;
	/** Table element id */
	id: string;
	/** Enums and Facets */
	/** Items to be rendered in the table */
	items: ModelKey<Item>[];
	/** Items header config */
	headers: ITableColumn[] | (ITableColumn[] | undefined)[];
	/** Id of items which should be fixed to the top */
	fixedRowIds?: number[];
	/** Optional background-color to be applied to fixed rows */
	fixedRowColor?: string;
	/** Filters which items should be filtered against */
	filters?: TFilter;
	/** Render expanded rows */
	onRenderExpandedRow?: (item: ModelKey<Item>) => ReactElement | null;
	/** Height of the expansion row content */
	onGetExpandedRowHeight?: (item: ModelKey<Item>) => number;
	/** Items ids which were checked */
	checkedItems?: (number | string)[];
	/** Custom highlighted rows ids */
	highlightedRowIds?: number[] | number;
	onHighlightItem?(id: number): void;
	/** Items ids which are expanded */
	expandedItems?: number[];
	/** Whether show table borders */
	showBorders?: boolean;
	/** Allow multi row expansion */
	legend?: ReactNode;
	/** Pagination object */
	pagination?: Required<IPagingFilters>;
	/** Allow multi row expansion */
	allowMultiRowExpansion?: boolean;
	/** Allow check-all functionality */
	allowCheckAll?: boolean;
	/** Collection name for which data is being displayed*/
	collectionName?: string;
	/** Message to be displayed when records have been loaded yet*/
	initialMessage?: string;
	/** Message (replaces the by default one) to be displayed when there are no rows to show*/
	noRowsMessage?: string;
	/** */
	customRenderers?: CustomRenderers<Item>;
	/** */
	pendingUpdates?: IPendingUpdates<Item>;
	/** Table class name */
	tableClassName?: string;
	/** Info row class name */
	infoRowId?: string;
	/** Placeholder value to be displayed if there is no cell data */
	cellDataPlaceholder?: ReactNode;
	/** Ids of items which should receive `row-new` class */
	newIds?: number[];
	/** Function to be triggered when component is loaded */
	onLoad?: (filters?: TFilter) => Promise<any>;
	/** Function to be triggered when item is checked */
	onToggleCheck?: (id: number) => void;
	onToggleExpand?: (id: number) => Promise<any>;
	/** Method to be called when a column is sorted */
	onSortItems?(orderByKey: string, sortDir: SortDirections): void;
	onBuildIds?: {
		row?: (item: ModelKey<Item>) => string;
		expander?: (item: ModelKey<Item>) => string;
		checkbox?: (item: ModelKey<Item>) => string;
		checkAll?: () => string;
		cell?: (item: ModelKey<Item>, columnKey: string) => string;
		header?(key: ITableColumn['key']): string;
	};
	/** Method to be called when the table is scrolled along the x-axis */
	onHorizontalScroll?: () => boolean;
	/** Method to be called to determine weather the cells of a given row show have a darker bottom-border (divider) */
	onGetIsBorderedRow?: (rowIndex: number) => boolean;
	/** Method to be called to store updated values for editable cells */
	onSave?(...args: any[]): any;
}

export interface IDataTableState<Item = any> {
	items: ModelKey<Item>[];
	fixedItems?: ModelKey<Item>[];
	columnsOrderBy?: string[];
	columnsWidths: Record<string, number>;
	scrollToRow?: number;
	highlightedRowIds: number[];
}

export interface IDataTableCheckBox {
	disabled: boolean;
	checked: boolean;
	onChange(): any;
}
