import 'jest-extended';

import { AppState } from '@xapp/state';

export {};

declare global {
	type T = Window & typeof globalThis;
	interface Window extends T {
		State: AppState;
	}

	interface Document {
		defaultView: any;
	}
}
