import { IRestOptions } from './IRestOptions';
import { IExceptionHandler } from './IExceptionHandler';

export interface IRestClientPayload<TInput = any> {
	url?: string;
	data?: any;
	options?: IRestOptions;
	formData?: TInput;
	errorHandler?: IExceptionHandler;
}
