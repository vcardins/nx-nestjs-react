import React, { useState } from 'react';
import { Wrapper } from './styles';
import { useTimeout } from '../../hooks/useTimeout';
import { Progress } from '../Progress';
import { ProgressType } from '../Progress/ProgressType';

interface IPageLoadingProps {
	delay?: number;
	message?: string;
}

export function PageLoading({ delay = 10, message }: IPageLoadingProps) {
	const [showLoading, setShowLoading] = useState(delay <= 0);

	useTimeout(() => {
		setShowLoading(true);
	}, delay);

	if ( !showLoading ) {
		return null;
	}

	return (
		<Wrapper>
			<Progress
				type={ProgressType.Linear}
				message={message}
			/>
		</Wrapper>
	);
}
