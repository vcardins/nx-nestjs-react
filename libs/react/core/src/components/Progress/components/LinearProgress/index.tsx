// https://codepen.io/finnhvman/pen/OBLZRX
import React from 'react';

import {
	LinearProgressContainer,
	LinearProgressShape,
} from './styles';
import { IProgressTypesProps } from '../IProgressTypesProps';

export const LinearProgress = ({ message }: IProgressTypesProps) => (
	<LinearProgressContainer>
		{message ? <div>{message}</div> : null}
		<LinearProgressShape/>
	</LinearProgressContainer>
);
