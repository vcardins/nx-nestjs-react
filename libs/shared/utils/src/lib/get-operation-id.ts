import { toTitleCase } from './string';

export const getOperationId = (model: string, operation: string, title = '') => {
	const modelFormatted = toTitleCase(model).replace(/\s/g, '');
	const operationFormatted = toTitleCase(operation).replace(/\s/g, '');

	return {
		title,
		operationId: `${modelFormatted}_${operationFormatted}`,
	};
};
