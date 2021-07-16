import React from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line camelcase
import { ic_close } from 'react-icons-kit/md/ic_close';

import { INotifier, INotifierCallback } from '@xapp/shared/types';
import { Icon } from '../../components/Icon';

/**
 * Notifier class
 */
export const useNotifier = (): INotifier => ({
	info: (
		message: string,
		title?: string,
		callback?: INotifierCallback,
	) => {
		toast.info(title, {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

		callback?.();
	},

	success: (
		message: string,
		title?: string,
		callback?: INotifierCallback,
	) => {
		toast.info(title, {
			position: 'bottom-right',
			autoClose: 2500,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

		callback?.();
	},

	error: (error: string, onClose?: INotifierCallback) => {
		toast.error(
			<>
				<Icon
					style={{ verticalAlign: 'bottom', marginLeft: '1em' }}
					icon={ic_close}
				/>
				<span
					style={{
						display: 'inline-block',
						marginLeft: '1em',
						marginBottom: '2px',
					}}
				>
					{error}
				</span>
			</>,
			{
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			},
		);

		onClose?.();
	},

	showLoading: (show = true) => {
		if (show) {
			toast.info('Loading ...');
		}
	},
});
