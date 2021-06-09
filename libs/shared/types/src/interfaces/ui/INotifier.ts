/**
 * Notifier callback function
 */
export interface INotifierCallback {
	(ok?: boolean): void;
}

/**
 * Notifier interface
 */
export interface INotifier {
	/**
	 * Report message
	 * @param message Message
	 * @param title Title
	 * @callback callback Callback
	 */
	info(message: string, title?: string, callback?: INotifierCallback): void;

	success(message: string, title?: string, callback?: INotifierCallback): void;

	/**
	 * Report error
	 * @param error Error message
	 * @callback callback Callback
	 */
	error(error: string, callback?: INotifierCallback): void;

	/**
	 * Show loading
	 * @param show Show it or hide
	 */
	showLoading(show: boolean): void;
}
