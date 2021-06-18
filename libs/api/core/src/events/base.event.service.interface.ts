import { IEvent } from './events.interface';

export interface IEventService {
	events: IEvent[];
	addEvent(event: IEvent): void;
	raiseEvents(): void;
	clearEvents(): void;
}
