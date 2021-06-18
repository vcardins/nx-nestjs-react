import React from 'react';
import { render } from '@testing-library/react';

import TaskPage from './Task';

describe('Task', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TaskPage />);

		expect(baseElement).toBeTruthy();
	});

	it('should have a greeting as the title', () => {
		const { getByText } = render(<TaskPage />);

		expect(getByText('Welcome to xapp!')).toBeTruthy();
	});
});
