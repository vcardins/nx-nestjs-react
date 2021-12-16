export interface IValidationError extends Error {
	errors: string | string[];
	message: string;
}
