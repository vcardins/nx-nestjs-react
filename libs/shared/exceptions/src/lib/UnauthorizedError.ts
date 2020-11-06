import ExtendableError from 'es6-error';
export class UnauthorizedError extends ExtendableError {
	constructor() {
		super('Unauthorized');
		// eslint-disable-next-line immutable/no-mutation
		this.name = 'UnauthorizedError';
	}
}
