// import crypto from 'crypto';
const getCSPRNG = (min: number, max: number) => {
	// validate
	if (min < 0) {
		return;
	}
	if (min > max) {
		return;
	}
	let array;
	// choose the correct array type
	switch (true) {
		case max < 1:
			console.error('max must be at least 1');
			return;
		case max < 256: // 1-255
			array = new Uint8Array(1);
			break;
		case max < 65536: // 256-65535
			array = new Uint16Array(1); // default
			break;
		case max < 4294967296: // 65536-4294967295
			array = new Uint32Array(1);
			break;
		default:
			console.error('max must be no more than 4294967295');
			return;
	}
	let randomNumber = crypto.getRandomValues(array)[0];
	// let attempts = 1;
	while (randomNumber > max || randomNumber < min) {
		randomNumber = crypto.getRandomValues(array)[0]; // retry until result is in range
		// attempts++; // track failed generations
	}
	// console.info({
	// 	randomNumber,
	// 	attempts,
	// });

	return randomNumber as number;
};

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

	const randomBytes = getCSPRNG(length, length);
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

export const toTitleCase = (str: string): string =>
	str
		.toLowerCase()
		.split(' ')
		.map((word) => word.replace(word[0], word[0].toUpperCase()))
		.join(' ');
