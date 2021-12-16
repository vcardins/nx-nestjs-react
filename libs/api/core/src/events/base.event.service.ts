import { Logger } from '@nestjs/common';
import { IEvent, IEventService } from '.';

export class EventService implements IEventService {
	events: IEvent[] = [];

	public addEvent(event: IEvent) {
		this.events.push(event);
	}

	public raiseEvents() {
		this.events.forEach((event) => {
			Logger.log(typeof event);
			event.run();
		});
	}

	public clearEvents(): void {
		this.events = [];
	}
}
