// https://codepen.io/finnhvman/pen/OBLZRX
import React from 'react';
import {
	LinearProgressContainer,
	LinearProgressBar,
} from './styles';

interface ILinearProgress {
	message?: string;
}

const LinearProgress = ({ message }: ILinearProgress) => {
	return (
		<LinearProgressContainer>
			{message ? <div>{message}</div> : null}
			<LinearProgressBar/>
		</LinearProgressContainer>
	);
};

export { LinearProgress };
