// https://github.com/iamkun/dayjs/blob/dev/docs/en/Plugin.md#customparseformat
import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

export const DEFAULT_FORMAT = 'yyyy-mm-dd HH:mm';

interface IDateWrapperProps {
	width?: string | number;
	unit?: string;
}

interface IProps extends IDateWrapperProps {
	value: Date | string;
	format?: string;
}

const DateWrapper = styled.span<IDateWrapperProps>`
	width: ${({ width = 'inherit', unit = 'px' }) => Number(width) === NaN ? width : `${width}${unit}`};
	margin: 0 auto;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	font-size: 12px;
`;

export const formatDateTime = (value: IProps['value'], format = DEFAULT_FORMAT) =>
	dayjs(value).format(format);

export const DateFormatter = ({ value, width, unit, format = DEFAULT_FORMAT }: IProps) => {
	const date = value ? formatDateTime(value, format) : null;

	return (
		<DateWrapper width={width} unit={unit}>
			{ date }
		</DateWrapper>
	);
};
