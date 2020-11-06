/* eslint-disable no-console */
import { IStorage } from './IStorage';

const LocalStorage: IStorage = {
	get(key: string, initialValue: unknown): unknown {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		}
		catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	},

	set(key: string, value: any, removeIfUndefined: boolean): void {
		try {
			if (!value && removeIfUndefined) {
				return window.localStorage.removeItem(key);
			}
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function
				? value(LocalStorage.get(key))
				: value;
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		}
		catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	},

	remove(key: string): void {
		window.localStorage.removeItem(key);
	},
};

export { LocalStorage };
