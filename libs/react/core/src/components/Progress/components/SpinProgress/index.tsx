// https://codepen.io/finnhvman/pen/OBLZRX
import React from 'react';
import {
	SpinProgressShape,
	SpinProgressMessage,
	Spinner,
	SpinnerContainer,
	Gap,
	Left,
	Right,
	HalfCircle,
} from './styles';

import { IProgressTypesProps } from '../IProgressTypesProps';

export const SpinProgress = ({ message }: IProgressTypesProps) => (
	<SpinProgressShape>
		<Spinner>
			<SpinnerContainer>
				<Gap />
				<Left>
					<HalfCircle />
				</Left>
				<Right>
					<HalfCircle />
				</Right>
			</SpinnerContainer>
		</Spinner>
		{message ? <SpinProgressMessage>{message}</SpinProgressMessage> : null}
	</SpinProgressShape>
);
