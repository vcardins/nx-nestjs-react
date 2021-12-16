import { toTitleCase } from './to-title-case';

export interface IOperationID {
	title: string;
	operationId: string;
}

export const getOperationId = (model: string, operation: string, title: string = ''): IOperationID => {
	const modelFormatted = toTitleCase(model).replace(/\s/g, '');
	const operationFormatted = toTitleCase(operation).replace(/\s/g, '');

	return {
		title,
		operationId: `${modelFormatted}_${operationFormatted}`,
	};
};
