import React from 'react';

import { Suspense } from '../../../components/Suspense';
import { ILayoutProps } from '../ILayoutProps';

import { Container } from './styles';

export const CleanLayout = ({ id, renderedRoutes }: ILayoutProps) => (
	<Container id={id}>
		<Suspense>
			{ renderedRoutes }
		</Suspense>
	</Container>
);
