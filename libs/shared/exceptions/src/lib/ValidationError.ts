import ExtendableError from 'es6-error';

export class ValidationError extends ExtendableError {
	errors: string | string[];
	message: string;

	constructor(message: string) {
		super();
		Object.assign(this, {
			name: 'ValidationError',
			errors: Array.isArray(message) ? message : [message],
			message,
		});
	}
}
