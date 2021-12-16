import { BaseEntity as BaseOrmEntity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { validateSync } from 'class-validator';

import { CustomValidationError } from '../exceptions/CustomValidationError';

export interface IBaseEntity {
	id: number;
	doBeforeInsertion?(): void;
	doBeforeUpdate?(): void;
	validate?(): void;
}

export abstract class BaseEntity extends BaseOrmEntity implements IBaseEntity {
	@PrimaryGeneratedColumn()
	@Column('int', { primary: true })
	id: number = undefined;

	static get entityName(): string {
		return this.name;
	}

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}

	@BeforeUpdate()
	doBeforeUpdate() {
		this.validate();
	}

	public validate() {
		const errors = validateSync(this, { validationError: { target: false } });
		if (errors.length > 0) {
			throw new CustomValidationError(errors);
		}
	}
}
