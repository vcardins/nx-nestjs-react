import React from 'react';

import { Suspense } from '../../../components/Suspense';
import { ILayoutProps } from '../ILayoutProps';

import {
	Container,
} from './styles';


const CleanLayout = (props: ILayoutProps) => {
	const { id, renderedRoutes } = props;

	return (
		<Container id={id}>
			<Suspense>
				{ renderedRoutes }
			</Suspense>
		</Container>
	);
};

export {
	CleanLayout,
};
