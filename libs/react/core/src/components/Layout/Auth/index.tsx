import React from 'react';

import { Suspense } from '../../Suspense';
import { ILayoutProps } from '../ILayoutProps';
import { Container, Column1, Column2 } from './styles';

export const AuthLayout = ({ id, renderedRoutes }: ILayoutProps) => (
	<Container id={id}>
		<Column1></Column1>
		<Column2>
			<Suspense>
				{renderedRoutes}
			</Suspense>
		</Column2>
	</Container>
);
