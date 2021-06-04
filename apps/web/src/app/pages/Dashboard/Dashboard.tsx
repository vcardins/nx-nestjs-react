import React, { memo } from 'react';

import { Page } from '@xapp/react/core';

const DashboardPage = memo(() => {
	return (
		<Page title="Dashboard" padded>
			Dashboard
		</Page>
	);
});

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;
