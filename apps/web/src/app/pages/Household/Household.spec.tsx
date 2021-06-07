import React from 'react';
import { render } from '@testing-library/react';

import HouseholdPage from './Household';

describe('Household', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<HouseholdPage />);

		expect(baseElement).toBeTruthy();
	});

	it('should have a greeting as the title', () => {
		const { getByText } = render(<HouseholdPage />);

		expect(getByText('Welcome to xapp!')).toBeTruthy();
	});
});
