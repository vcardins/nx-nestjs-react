import React, { memo } from 'react';
import { Error } from '@xapp/react/core';

const Error500Page = memo(() => (
	<Error
		code="500"
		message="An error has occurred, please contact the administrator"
	/>
));

export default Error500Page;
