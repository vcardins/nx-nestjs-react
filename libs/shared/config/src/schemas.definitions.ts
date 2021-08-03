import { JSONSchema7 } from 'json-schema';

export type JSONSchema7Extended = JSONSchema7 & {
	errorMessage?: {
		minItems?: string;
		type?: string | string[];
		not?: string;
		pattern?: string;
		additionalProperties?: string;
	} | string;
};
const boolean: JSONSchema7Extended = { type: 'boolean' };

const positiveInteger: JSONSchema7Extended = {
	type: 'integer',
	minimum: 0,
	maximum: 9999999,
};

const positiveNumber: JSONSchema7Extended = {
	type: 'number',
	minimum: 0.0,
	maximum: 999999999999.0,
};

const positiveDecimalsLessThanOne: JSONSchema7Extended = {
	type: 'number',
	minimum: 0.00,
	maximum: 1.00,
};

const id: JSONSchema7Extended = {
	type: ['integer', 'null'],
	not: { type: 'null' },
	minimum: 1,
	errorMessage: {
		minItems: 'This field is required',
		type: 'Should be numeric.',
		not: 'This field is required',
	},
};

const ids: JSONSchema7Extended = {
	type: 'array',
	items: id,
};

const requiredIds: JSONSchema7Extended = {
	type: 'array',
	items: { type: 'integer', minimum: 1 },
	minItems: 1,
	errorMessage: {
		type: 'Should be integer',
		minItems: 'This field is required',
	},
};

const date: JSONSchema7Extended = {
	type: 'string',
	pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}',
	errorMessage: {
		pattern: 'Invalid date.',
	},
};

const time: JSONSchema7Extended = {
	description: 'UTC time of day for start time',
	type: 'string',
	pattern: '^(([0-9]?|[1]{1}[0-9]{1}|[2]{1}[0-3]{1}|0[0-9]{1}):[0-5]{1}[0-9]{1}(:[0-5][0-9])?)$|^24:00$|^24:00:00$',
};

const requiredTime: JSONSchema7Extended = {
	...time,
	minimum: 4,
};

const quarter: JSONSchema7Extended = {
	type: 'string',
	pattern: '^q[0-9]{1}$',
};

const year: JSONSchema7Extended = {
	type: 'integer',
	pattern: '^[0-9]{4}$',
};

const startDate: JSONSchema7Extended = {
	type: 'string',
	pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
};

const email: JSONSchema7Extended = {
	type: 'string',
	pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$',
	errorMessage: {
		pattern: 'Please enter a valid email address',
	},
};

const optionalEmail: JSONSchema7Extended = {
	type: ['string', 'null'],
	pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$',
};

const code: JSONSchema7Extended = {
	type: 'string',
	minLength: 1,
	maxLength: 8,
};

const password: JSONSchema7Extended = {
	type: 'string',
	minLength: 1,
	maxLength: 128,
};

const shortString: JSONSchema7Extended = {
	type: 'string',
	minLength: 1,
	maxLength: 20,
};

const mediumString: JSONSchema7Extended = {
	type: 'string',
	minLength: 1,
	maxLength: 80,
};

const longString: JSONSchema7Extended = {
	type: 'string',
	minLength: 1,
	maxLength: 256,
};

const text: JSONSchema7Extended = {
	type: 'string',
	minLength: 1,
	maxLength: 512,
};

const guid: JSONSchema7Extended = {
	type: 'string',
	pattern: '^[{|\\(]?[0-9A-Fa-f]{8}[-]?([0-9A-Fa-f]{4}[-]?){3}[0-9A-Fa-f]{12}[\\)|}]?$',
};

const hasString: JSONSchema7Extended = {
	type: 'string',
	// minLength: 1,
	pattern: '.*\\S.*', /// should have at least one non-nonwhitespace char,
	errorMessage: 'This field is required',
};

const hasInteger: JSONSchema7Extended = {
	type: 'integer',
	minLength: 1,
};

const phone: JSONSchema7Extended = {
	type: 'object',
	properties: {
		number: {
			type: ['string', 'integer'],
			pattern: '(^[0-9]{3}-[0-9]{3}-[0-9]{4}$)|(^[0-9]{10}$)',
			errorMessage: 'Please remove any extra spaces and use one of these formats: 555-555-5555 OR 5555555555.',
		} as JSONSchema7Extended,
		extension: {
			type: ['string', 'null', 'integer'],
			pattern: '^[0-9*#,]*$',
			errorMessage: 'Phone extensions must not contain spaces and should only include numbers, asterisks (*), pound symbols (#) or commas (,)',
		} as JSONSchema7Extended,
	},
	required: ['number'],
};

export const schemas = {
	boolean,
	code,
	date,
	email,
	guid,
	hasInteger,
	hasString,
	startDate,
	id,
	ids,
	optionalEmail,
	phone,
	positiveDecimalsLessThanOne,
	positiveInteger,
	positiveNumber,
	quarter,
	requiredIds,
	requiredTime,
	time,
	year,
	shortString,
	mediumString,
	longString,
	password,

	text,
};
