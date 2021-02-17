import React from 'react';
// import { DayPicker, DayPickerComponentProps } from 'react-day-picker';
import { DateUtils, DayPickerInputProps } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import { FieldSet } from '../FieldSet';
import { IHtmlField } from '../../../interfaces/IHtmlField';

export const DATE_FORMAT = 'YYYY-MM-DD';

export function parseDate(str: string, format: string, locale: Object) {
	// @ts-ignore
	const parsed = dateFnsParse(str, format, locale);
	return (DateUtils.isDate(parsed))
		? parsed
		: undefined;
}

export function formatDate(date: Date, format: string = DATE_FORMAT, locale?: string) {
	return dateFnsFormat(date, format, { locale });
}

interface IDatePicker extends Omit<IHtmlField, 'value' | 'classNames'>, DayPickerInputProps {
	format?: string;
}

export function DatePicker({ name, label, format = DATE_FORMAT, ...props }: IDatePicker) {
	return (
		<FieldSet name={name} label={label}>
			{/* @ts-ignore */}
			<DayPickerInput
				{...props}
				format={format}
				formatDate={formatDate}
				parseDate={parseDate}
				placeholder={`${dateFnsFormat(new Date(), format)}`}
			/>
		</FieldSet>
	);
}
