export class FieldValidationError<T> {
	errors: Record<keyof T, string | string[]>;

	constructor(field: keyof T, message: string | string[]) {
		Object.assign(this, {
			name: 'FieldValidationError',
			errors: { [field]:  Array.isArray(message) ? message : [message] },
		});
	}
}
