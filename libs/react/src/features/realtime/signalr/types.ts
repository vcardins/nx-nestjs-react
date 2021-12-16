import { IRealTimeService } from '../IRealTimeService';

export interface ISignalRServiceProps {
	host: string;
	hubName?: string;
	authToken?: string;
	logging: boolean;
	withCredentials?: boolean;
	onSubscribe?: (instance: IRealTimeService) => void;
}

export interface ISignalREvent {
	userId: string;
	module: string;
	action: string;
	data?: any;
}
