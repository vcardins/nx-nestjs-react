import React, { useState } from 'react';
import { Wrapper } from './styles';
import { useTimeout } from '../../hooks/useTimeout';
import { LinearProgress } from '../LinearProgress';

type IProps = {
	delay?: number;
	message?: string;
};

export function PageLoading({ delay = 10, message }: IProps) {
	const [showLoading, setShowLoading] = useState(delay <= 0);

	useTimeout(() => {
		setShowLoading(true);
	}, delay);

	if ( !showLoading ) {
		return null;
	}

	return (
		<Wrapper>
			<LinearProgress message={message}/>
		</Wrapper>
	);
}
