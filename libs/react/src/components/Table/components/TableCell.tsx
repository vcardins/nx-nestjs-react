import React from 'react';

import { ITableCellProps } from '../types';

export const TD = (props: ITableCellProps & { left?: number; right?: number }) => {
	const { id, children, fixed, forwardRef, order, left, right, role = 'td' } = props;
	const style = {
		left: left !== null ? `${left}px` : undefined,
		right: right !== null ? `${right}px` : undefined,
	};

	return (
		<div
			id={id}
			ref={forwardRef}
			role={role}
			data-order={order}
			data-fixed={fixed}
			style={style}
		>
			{children}
		</div>
	);
};
