export type StoreEventHandlers = {
	on?: (event: string, callback: (args: any) => void) => void;
	off?: (event: string, callback: (args: any) => void) => void;
};
