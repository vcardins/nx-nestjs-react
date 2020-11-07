import React from 'react';

import { Button } from '../../Button';

interface ISubmit {
	id?: string;
	loading?: boolean;
	success?: boolean;
	loadingText?: string;
	children?: React.ReactNode;
}

export const Submit = ({
	id,
	loading,
	success,
	children = 'Submit',
	loadingText = 'Submitting ...',
}: ISubmit) => (
	<Button
		id={id || name}
		disabled={loading}
		name={name}
		type="submit"
	>
		{
			loading
				? loadingText
				: children
		}
	</Button>
);
