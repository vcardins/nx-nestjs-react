
export type ErrorData = { [key: string]: any };

export class CustomError extends Error {
	constructor(
		public message: string,
		public code: string | number = 'INTERNAL_ERROR',
		public status: number = 500,
		public data: ErrorData = {},
	) {
		super(message);
	}
}
