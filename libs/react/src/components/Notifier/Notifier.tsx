import { INotifier, NotifierFunc } from '@xapp/shared/types';
import { toast, ToastOptions, TypeOptions } from 'react-toastify';

const defaultOptions: Partial<ToastOptions> = {
	position: 'bottom-right',
	autoClose: 2500,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

const notify = (type: TypeOptions): NotifierFunc => (message: string, options?: ToastOptions) =>
	toast[type](message, { ...defaultOptions, ...options });

export const useNotifier = (): INotifier => ({
	info: notify('info'),
	success: notify('success'),
	warning: notify('warning'),
	error: notify('error'),
	showLoading: (show = true) => show ? toast.info('Loading ...') : null,
});
