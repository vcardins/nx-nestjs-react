import React from 'react';
import { ToastOptions, TypeOptions } from 'react-toastify';

export type NotifierFunc = (message: string, options?: ToastOptions) => React.ReactText;

export interface INotifier {
	info: NotifierFunc;
	success: NotifierFunc;
	warning: NotifierFunc;
	error: NotifierFunc;
	showLoading?: (show: boolean) => React.ReactText | null;
}
