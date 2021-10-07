import React from 'react';

import { ITableCellProps } from '../types';

export const TD = (props: ITableCellProps & { left?: number; right?: number }) => {
	const { id, children, fixed, forwardRef, left, right, role = 'td' } = props;
	const style = {
		left: !isNaN(left) ? `${left}px` : undefined,
		right: !isNaN(right) ? `${right}px` : undefined,
	};

	return (
		<div
			id={id}
			ref={forwardRef}
			role={role}
			data-fixed={fixed}
			style={style}
		>
			{children}
		</div>
	);
};
