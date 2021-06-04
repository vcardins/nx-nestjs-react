import React, { memo } from 'react';
<<<<<<< Updated upstream

const DashboardPage = memo(() => (
	<div>
		<h1>Dashboard</h1>
	</div>
));
=======
import { Page } from '@xapp/react/core';

const DashboardPage = memo(() => {
	return (
		<Page title="Dashboard" padded>
			Dashboard
		</Page>
	);
});
>>>>>>> Stashed changes

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;
