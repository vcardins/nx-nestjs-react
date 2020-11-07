import { CustomError } from './CustomError';
export class RouteNotFoundError extends CustomError {
	constructor(originalUrl: string) {
		super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
	}
}
