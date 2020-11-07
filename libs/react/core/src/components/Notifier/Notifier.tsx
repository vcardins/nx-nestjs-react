import React from 'react';
import { toast } from 'react-toastify';
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';

import { INotifier, INotifierCallback } from './INotifier';

/**
 * Notifier class
 */
export class Notifier implements INotifier {
	constructor() {}

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
					path={mdiCloseCircle}
					size={1.25}
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
	}

	public showLoading(show = true) {
		throw Error('Not yet implemented');
	}
}
