/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRestOptions } from './IRestOptions';
import { IRestExceptionHandler } from './IRestExceptionHandler';

export interface IRestClientPayload<TInput = any> {
	url?: string;
	data?: any;
	options?: IRestOptions;
	formData?: TInput;
	errorHandler?: IRestExceptionHandler;
}
