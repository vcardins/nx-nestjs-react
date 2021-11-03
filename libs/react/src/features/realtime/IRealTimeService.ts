export interface IRealTimeService {
	subscribedKeys: Record<string, boolean>;
	connected: boolean;
	start: (options?: any) => void;
	stop: () => void;
	on(actions: string, fn: (data: any) => void): void;
	off(actions: string, fn: (data: any) => void): void;
	emit(...args: any): void;
}
