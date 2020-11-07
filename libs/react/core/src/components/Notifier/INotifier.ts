/**
 * Notifier callback function
 */
export interface INotifierCallback {
	(ok: boolean): void;
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
	report(message: string, title?: string, callback?: INotifierCallback): void;

	/**
	 * Report error
	 * @param error Error message
	 * @callback callback Callback
	 */
	reportError(error: string, callback?: INotifierCallback): void;

	/**
	 * Show loading
	 * @param show Show it or hide
	 */
	showLoading(show: boolean): void;
}
