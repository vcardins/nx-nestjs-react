import ExtendableError from 'es6-error';

export class UnauthorizedError extends ExtendableError {
	constructor() {
		super('Unauthorized');
		this.name = 'UnauthorizedError';
	}
}
