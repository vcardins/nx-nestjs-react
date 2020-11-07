/* eslint-disable no-console */
import { Router } from 'react-router-dom';
import history from 'history';

// eslint-disable-next-line no-console
// const Console = console;

export class DebugRouter extends Router {
	constructor(props: {history: history.History}) {
		super(props);

		// Console.log('Initial history is: ', JSON.stringify(props.history, null, 2));

		// props.history.listen((location, action) => {
		// 	Console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
		// 	Console.log(`The last navigation action was ${action}`, JSON.stringify(props.history, null, 2));
		// });
	}
}
