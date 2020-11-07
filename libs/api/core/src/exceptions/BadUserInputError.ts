import { CustomError, ErrorData } from './CustomError';
export class BadUserInputError extends CustomError {
	constructor(errorData: ErrorData) {
		super('There were validation errors.', 'BAD_USER_INPUT', 400, errorData);
	}
}
