import React, { memo } from 'react';
import { Error } from '@xapp/react/core';

const Error404Page = memo(() => (
	<Error
		code="404"
		message="Page could not be found"
	/>
));

Error404Page.displayName = 'Error404Page';

export default Error404Page;
