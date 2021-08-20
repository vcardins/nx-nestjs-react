import React, { memo } from 'react';

import { Page, Tabs, Tab } from '@xapp/react';

const DashboardPage = memo(() => {
	return (
		<Page title="Dashboard" padded>
			<Tabs>
				<Tab label="Panel 1">
					<p>Dashboard</p>
				</Tab>
				<Tab label="Panel 2">
					<p>Dashboard 2</p>
				</Tab>
				<Tab label="Long Panel 3">
					<p>Dashboard 3</p>
				</Tab>
			</Tabs>
		</Page>
	);
});

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;
