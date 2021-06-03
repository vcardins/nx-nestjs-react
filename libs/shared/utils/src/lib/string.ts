import * as crypto from 'crypto';

export function randomString(length: number, chars: string) {
	if (!chars) {
		throw new Error('Argument \'chars\' is undefined');
	}

	const charsLength = chars.length;
	if (charsLength > 256) {
		throw new Error(
			'Argument \'chars\' should not have more than 256 characters' + ', otherwise unpredictability will be broken',
		);
	}

	const randomBytes = crypto.randomBytes(length);
	const result = new Array(length);

	let cursor = 0;
	for (let i = 0; i < length; i++) {
		cursor += randomBytes[i];
		result[i] = chars[cursor % charsLength];
	}

	return result.join('');
}

/** Sync */
export function randomAsciiString(length: number) {
	return randomString(length, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
}

export const toTitleCase = (str: string): string => str
	.toLowerCase()
	.split(' ')
	.map((word) => word.replace(word[0], word[0].toUpperCase()))
	.join(' ');
