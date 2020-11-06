/* eslint-disable immutable/no-mutation */
import { ClassTransformer, ClassTransformOptions } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { TransformOperationExecutor } from 'class-transformer/TransformOperationExecutor';
import { TransformationType } from 'class-transformer/enums/transformation-type.enum';
import { getFromContainer, MetadataStorage, ValidationTypes } from 'class-validator';

const strip = (container: MetadataStorage, type: new () => any, input: any) => {
	const metadata = container.getTargetValidationMetadatas(type, undefined);
	const groupedMetadata = container.groupByPropertyName(metadata);
	const metadataPropertyKeys = Object.keys(groupedMetadata);
	const inputPropertyKeys = Object.keys(input);

	const extraneousProperties = inputPropertyKeys.filter((ip) => metadataPropertyKeys.every((mp) => mp !== ip));

	extraneousProperties.forEach((property) => {
		delete input[property];
	});

	const nestedProperties = metadata.filter((m) => m.type === ValidationTypes.NESTED_VALIDATION.toString());
	nestedProperties.forEach((prop) => {
		if (prop.each && input[prop.propertyName] && input[prop.propertyName].length > 0) {
			return input[prop.propertyName].map((p) => strip(container, p.constructor as new () => any, p));
		}
		if (
			(prop.each && (!input[prop.propertyName] || input[prop.propertyName].length === 0)) ||
			!input[prop.propertyName] ||
			!(input[prop.propertyName] instanceof Object)
		) {
			return;
		}

		return strip(container, input[prop.propertyName].constructor as new () => any, input[prop.propertyName]);
	});

	return input;
};

// eslint-disable-next-line immutable/no-mutation
ClassTransformer.prototype.plainToClass = <T extends Object, V extends any[]>(
	cls: ClassType<T>,
	plain: V,
	options?: ClassTransformOptions,
): T[] => {
	const executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, options || {});
	const object = executor.transform(undefined, plain, cls, undefined, undefined);
	const container = getFromContainer(MetadataStorage);
	return strip(container, cls, object);
};
