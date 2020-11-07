import { CustomError } from './CustomError';

export class EntityNotFoundError extends CustomError {
	constructor(entityName: string) {
		super(`${entityName} not found.`, 'ENTITY_NOT_FOUND', 404);
	}
}
