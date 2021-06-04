import React, { memo, useEffect } from 'react';
import { useStore } from '@xapp/state';
import { Page } from '@xapp/react/core';

const StatePage = memo(() => {
	const { count, increment, decrement } = useStore((state) => state.counter);
	const { status, data, getAll, reset, setEndpoint } = useStore((state) => state.apiCall);

	useEffect(() => setEndpoint('https://jsonplaceholder.typicode.com/todos'), [setEndpoint]);

	return (
		<Page title="State Management" padded>
			<div>
				count: {count} - <button onClick={increment}> + </button>
				<button onClick={decrement}> - </button>
			</div>
			<div>
				status: {status} - <button onClick={getAll}>fetch</button> <button onClick={reset}>reset</button> -{' '}
				{JSON.stringify(data)}
			</div>
		</Page>
	);
});

StatePage.displayName = 'StatePage';

export default StatePage;
