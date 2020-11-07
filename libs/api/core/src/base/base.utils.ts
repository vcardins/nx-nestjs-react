import 'reflect-metadata';

export const formatEntityName = (entity: { new (): any }, create = true) =>
	entity.name.replace('Input', create ? 'CreateInput' : 'UpdateInput');
