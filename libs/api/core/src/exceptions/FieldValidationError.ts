export class FieldValidationError {
	errors: Set<string | string[]>;

	constructor(field: string, message: string | string[]) {
		Object.assign(this, {
			name: 'FieldValidationError',
			errors: { [field]:  Array.isArray(message) ? message : [message]},
		});
	}
}
