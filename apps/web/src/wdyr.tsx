import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
	whyDidYouRender(React, {
		trackAllPureComponents: true,
		onlyLogs: true,
		titleColor: 'green',
		diffNameColor: 'aqua',
	});
}
