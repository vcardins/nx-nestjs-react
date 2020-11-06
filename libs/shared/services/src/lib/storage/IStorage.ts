export interface IStorage {
	get(key: string, initialValue?: unknown): any;
	set(key: string, value: any, removeIfUndefined?: boolean): void;
	set(key: string, value: any, time?: any): void;
	remove(key: string): void;
}
