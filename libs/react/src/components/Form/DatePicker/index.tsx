import React from 'react';
import { DateUtils, DayPickerInputProps } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { format, parse } from 'date-fns';

import { IHtmlField } from '@xapp/shared/types';
import { FieldSet } from '../FieldSet';

export const DATE_FORMAT = 'yyyy-MM-dd';

export function parseDate(str: string, formatString: string, locale: Object) {
	// @ts-ignore
	const parsed = parse(str, formatString, locale);
	return (DateUtils.isDate(parsed))
		? parsed
		: undefined;
}

export function formatDate(date: Date, formatString: string = DATE_FORMAT) {
	return format(date, formatString);
}

interface IDatePicker extends Omit<IHtmlField, 'value' | 'classNames'>, DayPickerInputProps {
	formatString?: string;
}

export function DatePicker({ name, label, formatString = DATE_FORMAT, ...props }: IDatePicker) {
	return (
		<FieldSet name={name} label={label}>
			<DayPickerInput
				{...props}
				format={formatString}
				formatDate={formatDate}
				parseDate={parseDate}
				placeholder={`${format(new Date(), formatString)}`}
			/>
		</FieldSet>
	);
}
