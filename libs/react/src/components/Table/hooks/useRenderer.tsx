import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';

import { TableCell } from '../components';

import { ITableCellProps, TableCellFormats, CharCase, ICheckboxOptions, IExpanderOptions, ICommonRenderer, RenderProps } from '../types';

type JSX = React.ReactElement;

const ExpandIcon = styled.i`
	width: auto;
	margin: 0;
	content: '+';
`;

function checkboxRenderer(checkbox: ICheckboxOptions): JSX {
	return (
		checkbox && (
			<input
				type="checkbox"
				{...checkbox}
			/>
		)
	);
}

function expanderRenderer(expander: IExpanderOptions): JSX {
	return (
		expander && (
			<ExpandIcon
				{...expander}
			/>
		)
	);
}

function stringRendererFactory(charCase = CharCase.None) {
	return function stringRenderer({ data, cellDataPlaceholder }: { data: string; cellDataPlaceholder: string }): string {
		let stringData = data;

		if (charCase === CharCase.UpperCase) stringData = data.toString().toUpperCase();
		if (charCase === CharCase.LowerCase) stringData = data.toString().toLowerCase();
		// if (charCase === CharCase.TitleCase) stringData = _.startCase(data);

		return (
			stringData ?? cellDataPlaceholder
		);
	};
}

function numberRendererFactory(format?: string) {
	// eslint-disable-next-line  react/function-component-definition, react/display-name
	return (props: ICommonRenderer<string | number> & RenderProps<any>) => {
		let value: string | null = null;

		if (props.data == null) {
			if (props.showNAIfEmpty) {
				value = 'N/A';
			}
			else if (props.cellDataPlaceholder) {
				value = props.cellDataPlaceholder;
			}
		}
		else {
			value = numeral(props.data).format(format);
		}

		return value;
	};
}


function timeRenderer({ cellProps, data }: ICommonRenderer<number>): JSX {
	return (
		<TableCell {...cellProps}>
			{numeral(data).format('00:00:00')}
		</TableCell>
	);
}

function booleanRenderer({ cellProps, data }: ICommonRenderer<boolean>): JSX {
	return (
		<TableCell {...cellProps}>
			{!!data ? 'Yes' : 'No'}
		</TableCell>
	);
}

export const useRenderer: any = {
	[TableCellFormats.Checkbox]: checkboxRenderer,
	[TableCellFormats.Expander]: expanderRenderer,
	[TableCellFormats.String]: stringRendererFactory(),
	[TableCellFormats.StringLowerCase]: stringRendererFactory(CharCase.LowerCase),
	[TableCellFormats.StringUpperCase]: stringRendererFactory(CharCase.UpperCase),
	[TableCellFormats.StringTitleCase]: stringRendererFactory(CharCase.TitleCase),
	[TableCellFormats.Integer]: numberRendererFactory(),
	[TableCellFormats.Decimal]: numberRendererFactory('0,0'),
	[TableCellFormats.Dollar]: numberRendererFactory('$'),
	[TableCellFormats.Percentage]: numberRendererFactory('0%'),
	[TableCellFormats.DecimalPercentage]: numberRendererFactory('0.00%'),
	// [TableCellTypes.Date]: dateRenderer,
	// [TableCellTypes.DateTime]: dateTimeRenderer,
	// [TableCellTypes.Days]: daysRenderer,
	[TableCellFormats.Time]: timeRenderer,
	[TableCellFormats.Boolean]: booleanRenderer,
};
