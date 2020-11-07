import React from 'react';
import { PageLoading } from '../PageLoading';

type LoadingProps = {
	delay: number;
};

type IProps = {
	loadingProps?: LoadingProps;
	children: React.ReactNode;
};

export function Suspense({ loadingProps = { delay: 300 }, children }: IProps) {
	return (
		<React.Suspense fallback={<PageLoading {...loadingProps} />}>
			{children}
		</React.Suspense>
	);
}
