import { IValidationError } from './IValidationError';

export interface IActionResponse<T = any> {
	redirect?: string;
	message?: string;
	errors?: IValidationError;
	data?: T | null;
}
