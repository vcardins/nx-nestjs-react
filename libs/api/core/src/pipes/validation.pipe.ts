import { Injectable, HttpException, HttpStatus/*, BadRequestException*/ } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

type MetaType = string | boolean | number | any | object;

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	public async transform(value: any, metadata: ArgumentMetadata) {
		// if (!value) {
		// 	throw new BadRequestException('No data submitted');
		// }

		const metaType = metadata.metatype as MetaType;

		if (!metaType || !this.toValidate(metaType)) {
			return value;
		}

		const entity = plainToClass(metaType, value);
		const errors = await validate(entity, {
			validationError: { target: false },
		});

		if (errors.length > 0) {
			// throw new CustomValidationError(errors);
			throw new HttpException(
				{
					message: 'Input data validation failed',
					errors:  this.buildError(errors),
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		return entity;
	}

	private buildError(errors: ValidationError[]) {
		const result = {};
		// TODO: Convert to reduce
		errors.forEach((el) => {
			Object.entries(el.constraints).forEach((constraint) => {
				result[el.property] = constraint[1];

				// result[el.property] = constraint;
				// {
				// 	message: constraint[1],
				// 	constraint: constraint[0],
				// };
			});
		});
		return result;
	}

	private toValidate(metatype: MetaType): boolean {
		const types = [String, Boolean, Number, Array, Object];
		return !types.find((type) => metatype === type) && metatype;
	}
}
