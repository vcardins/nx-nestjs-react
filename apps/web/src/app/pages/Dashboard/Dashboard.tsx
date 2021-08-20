import React, { memo } from 'react';

import { Page, Tabs, Tab } from '@xapp/react';

const DashboardPage = memo(() => {
	return (
		<Page title="Dashboard" padded>
			<Tabs>
				<Tab label="Dashboard">
					<p>Dashboard</p>
				</Tab>
				<Tab label="Dashboard 2">
					<p>Dashboard 2</p>
				</Tab>
				<Tab label="Dashboard 3" selected>
					<p>Dashboard 3</p>
				</Tab>
				<Tab label="Dashboard 4">
					<p>Dashboard 4</p>
				</Tab>
			</Tabs>
		</Page>
	);
});

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;
