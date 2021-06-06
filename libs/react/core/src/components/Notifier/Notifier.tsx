import React from 'react';
import { toast } from 'react-toastify';

import { ic_close } from 'react-icons-kit/md/ic_close';

import { INotifier, INotifierCallback } from './INotifier';
import { Icon } from '../../components/Icon';

/**
 * Notifier class
 */
export class Notifier implements INotifier {
	/**
	 * Report message
	 * @param message Message
	 * @param title Title
	 * @param callback Callback
	 */
	public report(
		message: string,
		title?: string,
		callback?: INotifierCallback,
	) {
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
	}

	/**
	 * Report error
	 * @param error Error message
	 * @param callback Callback
	 */
	public reportError(error: string, onClose?: INotifierCallback) {
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
	}

	public showLoading(show = true) {
		if (show) {
			toast.info('Loading ...');
		}
	}
}
