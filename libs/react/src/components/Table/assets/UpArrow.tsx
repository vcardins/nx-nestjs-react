import styled from 'styled-components';

import { IIconProps } from './types';

export const UpArrow = styled.span<IIconProps>`
	font-size: ${({ size }) => size || '10px'};
	&:before {
		color: ${({ color }) => color || '#888'};
		content: '▲';
	}
`;
