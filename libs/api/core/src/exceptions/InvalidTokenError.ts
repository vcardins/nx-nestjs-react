import { CustomError } from './CustomError';

export class InvalidTokenError extends CustomError {
	constructor(message = 'Authentication token is invalid.') {
		super(message, 'INVALID_TOKEN', 401);
	}
}
