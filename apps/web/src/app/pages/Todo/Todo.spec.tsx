import React from 'react';
import { render } from '@testing-library/react';

import { Todo } from './';

describe('Todo', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Todo />);

		expect(baseElement).toBeTruthy();
	});

	it('should have a greeting as the title', () => {
		const { getByText } = render(<Todo />);

		expect(getByText('Welcome to xapp!')).toBeTruthy();
	});
});
