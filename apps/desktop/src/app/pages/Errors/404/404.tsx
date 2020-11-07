import React, { memo } from 'react';
import { Error } from '@xapp/react/core';

const Error404Page = memo(() => (
	<Error
		code="404"
		message="Page could not be found"
	/>
));

export default Error404Page;
