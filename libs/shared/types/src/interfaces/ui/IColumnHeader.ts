import { MutableRefObject } from 'react';
import { Positioning, SortDirections, DataFormats } from '../../enums';

export interface IColumnHeader {
	align?: Positioning;
	editable?: boolean;
	fixed?: Positioning;
	hidden?: boolean;
	label?: string;
	key: string;
	resizable?: boolean;
	searchable?: boolean;
	sortDirection?: SortDirections;
	forwardRef?: MutableRefObject<HTMLDivElement>;
	width?: number;
	left?: number;
	right?: number;
	format?: DataFormats;
}
